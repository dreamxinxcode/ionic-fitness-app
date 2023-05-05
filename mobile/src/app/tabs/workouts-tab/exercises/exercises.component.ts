import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit {

  exercises = [];
  userExercises = [];
  exerciseControl = new FormControl('');
  loading: boolean = true;

  constructor(
    private exerciseService: ExerciseService,
    private api: ApiService,
    private toast: ToastService,
  ) { }

  ngOnInit() {
    this.loadExercises();
    this.loadUserExercises();
  }

  loadExercises() {
    this.exerciseService.syncExercises().subscribe({
      next: (res: any) => {
        this.exercises = res;
      },
      error: (err) => {
        this.toast.render(err.message, 'danger', 'alert-circle-outline');
      },
      complete: () => {
        this.loading = false;
      } 
    });
  }

  loadUserExercises() {
    this.api.get('exercises/by_user').subscribe({
      next: (res: any) => {
        this.userExercises = res;
      },
      error: (err) => {
        this.toast.render(err.message, 'danger', 'alert-circle-outline');
      },
      complete: () => {
        this.loading = false;
      } 
    });
  
  }

  addExercise(exercise, index: number) {
    console.log(exercise)
    if (this.userExercises.includes(exercise)) {
      this.userExercises.splice(index, 1);
      return;
    }
    this.api.post('exercises/add_to_favorites', exercise).subscribe({
      next: (res) => {
        this.userExercises.push(exercise);
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {},
    });
  }

  submitExercise() {
    this.loading = true;
    this.api.post('exercises', { name: this.exerciseControl.value }).subscribe({
      next: (res: any) => {
        this.exercises.unshift(res);
        this.exerciseControl.reset();
      },
      error: (err) => {
        this.toast.render(err.message, 'danger', 'alert-circle-outline');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
