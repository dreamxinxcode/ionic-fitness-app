import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MomentsPage } from '../moments/moments.page';

import { MomentPage } from './moment.page';

const routes: Routes = [
  {
    path: '',
    component: MomentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MomentPageRoutingModule {}
