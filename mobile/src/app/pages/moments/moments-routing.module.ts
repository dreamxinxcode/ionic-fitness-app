import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { MomentPage } from './moment/moment.page';
import { MomentsPage } from './moments/moments.page';


const routes: Routes = [
  {
    path: '',
    component: MomentsPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'moment/:id',
    component: MomentPage,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutsTabPageRoutingModule {}
