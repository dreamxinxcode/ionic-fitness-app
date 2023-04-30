import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutTemplatesPage } from './workout-templates.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutTemplatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutTemplatesPageRoutingModule {}
