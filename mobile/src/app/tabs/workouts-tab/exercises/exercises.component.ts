import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit {

  private exercises = [];
  private userExercises = [];
  private muscleGroups = [];
  private customExerciseForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    muscle_group: new FormControl('', [Validators.required]),
  });
  private loading: boolean = true;

  constructor(
    private exerciseService: ExerciseService,
    private api: ApiService,
    private toast: ToastService,
  ) { }

  ngOnInit() {
    this.getExercises();
    this.getUserExercises();
    this.getMuscleGoups();
  }

  getExercises() {
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

  getUserExercises() {
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

  getMuscleGoups() {
    this.api.get('muscle-groups').subscribe({
      next: (res: any) => {
        this.muscleGroups = res;
      },
      error: (err) => {
        this.toast.render(err.message, 'danger', 'alert-circle-outline');
      },
      complete: () => {
        this.loading = false;
      } 
    });
  }

  toggleExercise(exercise, remove?: boolean) {
    const index = this.userExercises.indexOf(exercise);
    
    if (index !== -1 || remove) {
      this.api.post('exercises/unfavorite', exercise).subscribe({
        next: (res) => {
          this.userExercises.splice(index, 1);
        },
        error: (err) => {
          this.toast.render(err.statusText, 'danger', 'alert');
        },
      });
    } else {
      this.api.post('exercises/favorite', exercise).subscribe({
        next: (res) => {
          this.userExercises.push(exercise);
        },
        error: (err) => {
          this.toast.render(err.statusText, 'danger', 'alert');
        },
      });
    }
  }

  submitExercise() {
    this.loading = true;
    this.api.post('exercises', { name: this.customExerciseForm.value.name, muscle_group: this.customExerciseForm.value.muscle_group }).subscribe({
      next: (res: any) => {
        this.exercises.unshift(res);
        this.customExerciseForm.reset();
      },
      error: (err) => {
        this.toast.render(err.message, 'danger', 'alert-circle-outline');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  isFavorited(exercise): boolean {
    return this.userExercises.some(obj => obj.name === exercise.name);
  }
}
