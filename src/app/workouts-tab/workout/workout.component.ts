import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {

  workoutForm: FormArray;

  constructor(public alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.workoutForm = new FormArray([
      new FormGroup({
        name: new FormControl(),
        sets: new FormArray([
          new FormGroup({
            reps: new FormControl(),
            weight: new FormControl(),
          }),
        ]),
      })
    ]);
  }

  public addExercise():void {
    this.workoutForm.push(
      new FormGroup({
        name: new FormControl(),
        reps: new FormControl(),
        weight: new FormControl(),
        sets: new FormArray([
          new FormGroup({
            reps: new FormControl(),
            weight: new FormControl(),
          }),
        ]),
      })
    );
  }

  public addSet(index: number):void {
    const sets = this.workoutForm.controls[index].get('sets') as FormArray;
    sets.push(          
      new FormGroup({
        reps: new FormControl(),
        weight: new FormControl(),
      }),
    );
  }

  getSets(index: number) {
    return this.workoutForm.controls[index].get('sets') as FormArray;
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
            this.router.navigate(['/tabs/workouts-tab']);
          }
        }
      ]
    });

    await alert.present();
  }
}
