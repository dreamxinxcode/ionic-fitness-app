import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { ExercisesComponent } from './exercises/exercises.component';
import { WorkoutComponent } from './workout/workout.component';

import { WorkoutsTabPage } from './workouts-tab.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsTabPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'workout',
    component: WorkoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'workout/:uuid',
    component: WorkoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'exercises',
    component: ExercisesComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutsTabPageRoutingModule {}
