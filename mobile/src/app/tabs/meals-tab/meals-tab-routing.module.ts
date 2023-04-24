import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { MealComponent } from './meal/meal/meal.component';

import { MealsTabPage } from './meals-tab.page';

const routes: Routes = [
  {
    path: '',
    component: MealsTabPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'meal/:id',
    component: MealComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsTabPageRoutingModule {}
