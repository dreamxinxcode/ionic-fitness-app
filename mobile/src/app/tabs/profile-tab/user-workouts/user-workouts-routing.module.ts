import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserWorkoutsPage } from './user-workouts.page';

const routes: Routes = [
  {
    path: '',
    component: UserWorkoutsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserWorkoutsPageRoutingModule {}
