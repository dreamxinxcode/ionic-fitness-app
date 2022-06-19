import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {

  workoutForm: FormArray;

  constructor() { }

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
        sets: new FormArray([]),
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
  
  public onSubmit():void {
    console.log('Submitted')
  }
}
