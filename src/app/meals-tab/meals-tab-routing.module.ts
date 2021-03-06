import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealsTabPage } from './meals-tab.page';

const routes: Routes = [
  {
    path: '',
    component: MealsTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsTabPageRoutingModule {}
