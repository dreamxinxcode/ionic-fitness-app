import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertController, ViewWillLeave } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { v4 as uuid } from 'uuid';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { TimerService } from 'src/app/services/timer/timer.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit, ViewWillLeave {
  private timestamp = new FormControl(new Date());
  private workoutForm = new FormGroup({
    exercises: new FormArray([]),
  });
  private exerciseOptions;
  private datetime = new Date;

  constructor(
    public alertController: AlertController, 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
    private toast: ToastService,
    public dateTimeService: DateTimeService,
    public timer: TimerService,
    public userService: UserService,
  ) { }

  ngOnInit() {
    // If URL has a uuid param -> fetch workout and fill form values
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.http.get(this.config.API_URL + `/workouts/${id}/`).subscribe({
          next: (res) => {
            this.populateWorkoutForm(res);
          },
          error: (err) => {
            this.toast.render(err.statusText, 'danger', 'alert');
          }
        });
      } else {
        this.addExercise();
      }
    });
    this.http.get(this.config.API_URL + '/exercises/').subscribe({
      next: (res: any) => {
        this.exerciseOptions = {
          custom: res.filter(exercise => exercise.user),
          default: res.filter(exercise => !exercise.user),
        };
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      }, 
    });
  }

  ionViewWillLeave() {
    if (!this.workoutForm.controls.exercises.value.length) {
      console.log('No Exercises')
    }
  }

  get exercises() {
    return this.workoutForm.controls.exercises as FormArray;
  }

  addExercise(exercise?):void {
    const exerciseForm = new FormGroup({
      name: new FormControl(exercise?.exercise || ''),
      sets: new FormArray([]),
    });
    if (exercise) {
      for (let set of exercise.sets) {
        exerciseForm.controls.sets.push(
          new FormGroup({
            reps: new FormControl(set.reps, [ Validators.required, Validators.min(1), ]),
            weight: new FormControl(set.weight, [ Validators.required, Validators.min(0), ]),
          })
        );
      }
    } else {
      exerciseForm.controls.sets.push(
        new FormGroup({
          reps: new FormControl('', [ Validators.required, Validators.min(1), ]),
          weight: new FormControl('', [ Validators.required, Validators.min(0), ]),
        })
      );
    }
    this.workoutForm.controls.exercises.push(exerciseForm);
  }

  deleteExercise(index: number) {
    this.exercises.removeAt(index);
  }

  addSet(index: number):void {
    this.getSets(index).push(          
      new FormGroup({
        reps: new FormControl(),
        weight: new FormControl(),
      }),
    );
  }

  deleteSet(index: number):void {
    this.getSets(index).removeAt(index);
  }

  getSets(index: number) {
    return this.exercises.controls[index].get('sets') as FormArray;
  }

  getTargets(event) {
    const exercise = event.detail.value.trim();
    this.http.get(this.config.API_URL + `/workouts/targets/${exercise}/`).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {},
    });
  }

  cleanup() {
    this.workoutForm.value.exercises = this.workoutForm.value.exercises.filter((exercise) => {
      if (!exercise.name) {
        return false;
      }
      exercise.sets = exercise.sets.filter((set) => {
        return set.reps;
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Finished Your Workout?',
      message: 'Your progress will be saved to your profile.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          id: 'confirm-button',
          handler: () => {
            // this.cleanup();
            const workout_data = {
              uuid: uuid(),
              timestamp: this.timestamp.value,
              workout: this.workoutForm.value.exercises,
            };
            this.submitWorkout(workout_data);
          }
        }
      ]
    });

    await alert.present();
  }

  populateWorkoutForm(workout) {
    for (let exercise of workout.workout_data) {
      this.addExercise(exercise);
    }
  }

  submitWorkout(data) {
    this.http.post(this.config.API_URL + '/workouts/', data).subscribe({
      next: (res) => {
        this.toast.render('Success!', 'success', 'barbell-outline');
        this.userService.incrementWorkoutCount();
        this.router.navigate(['/tabs/workouts/']);
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
    });
  }
}
