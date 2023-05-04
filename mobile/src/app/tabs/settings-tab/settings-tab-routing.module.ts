import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';

import { SettingsTabPage } from './settings-tab.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsTabPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./account-settings/account-settings.module').then( m => m.AccountSettingsPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy-settings/privacy-settings.module').then( m => m.PrivacySettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsTabPageRoutingModule {}
