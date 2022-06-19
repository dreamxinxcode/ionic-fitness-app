import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutComponent } from './workout/workout.component';

import { WorkoutsTabPage } from './workouts-tab.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsTabPage
  },
  {
    path: 'workout',
    component: WorkoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutsTabPageRoutingModule {}
