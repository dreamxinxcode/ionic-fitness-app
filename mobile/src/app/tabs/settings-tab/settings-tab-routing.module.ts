import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';

import { SettingsTabPage } from './settings-tab.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsTabPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsTabPageRoutingModule {}
