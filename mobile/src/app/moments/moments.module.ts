import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentPage } from './moment/moment.page';
import { MomentsPage } from './moments/moments.page';
import { MomentPageRoutingModule } from './moment/moment-routing.module';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    MomentsPage,
    MomentPage
  ],
  imports: [
    CommonModule,
    MomentPageRoutingModule,
    ComponentsModule
  ]
})
export class MomentsModule { }
