import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutsTabPage } from './workouts-tab.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutsTabPageRoutingModule {}
