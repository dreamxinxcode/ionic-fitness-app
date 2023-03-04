import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth/auth.guard';

import { AnalyticsTabPage } from './analytics-tab.page';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsTabPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsTabPageRoutingModule {}
