import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { v4 as uuid } from 'uuid';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {

  workoutForm = new FormGroup({
    timestamp: new FormControl(),
    exercises: new FormArray([]),
  });
  exerciseOptions;

  constructor(
    public alertController: AlertController, 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public dateTimeService: DateTimeService,
  ) { }

  ngOnInit() {
    // If URL has a uuid param -> fetch workout and fill form values
    this.route.paramMap.subscribe((params: ParamMap) => {
      const uuid = params.get('uuid');
      if (uuid) {
        this.http.get(`http://localhost:8000/api/workouts/${uuid}/`).subscribe((res) => {
        });
      }
    });
    this.http.get('http://localhost:8000/api/exercises/').subscribe((res) => {
      this.exerciseOptions = res;
    });
    this.addExercise();
  }

  get exercises() {
    return this.workoutForm.controls.exercises as FormArray;
  }

  public addExercise():void {
    this.exercises.push(
      new FormGroup({
        name: new FormControl(),
        sets: new FormArray([
          new FormGroup({
            reps: new FormControl('', [ Validators.required, Validators.min(1), ]),
            weight: new FormControl('', [ Validators.required, Validators.min(0), ]),
          }),
        ]),
      })
    );
  }

  public addSet(index: number):void {
    this.getSets(index).push(          
      new FormGroup({
        reps: new FormControl(),
        weight: new FormControl(),
      }),
    );
  }

  public deleteSet(index: number):void {
    this.getSets(index).removeAt(index);
  }

  getSets(index: number) {
    return this.exercises.controls[index].get('sets') as FormArray;
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
            const data = {
              uuid: uuid(),
              workout: this.workoutForm.value
            };
            this.http.post('http://localhost:8000/api/workouts/', data).subscribe((res) => {
              console.log(res);
            });
            this.router.navigate(['/tabs/workouts-tab']);
          }
        }
      ]
    });

    await alert.present();
  }
}
