import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticsTabPage } from './analytics-tab.page';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsTabPageRoutingModule {}
