import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';

import { ProfileTabPage } from './profile-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileTabPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileTabPageRoutingModule {}
