import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutsTabPageRoutingModule } from './workouts-tab-routing.module';

import { WorkoutsTabPage } from './workouts-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutsTabPageRoutingModule
  ],
  declarations: [WorkoutsTabPage]
})
export class WorkoutsTabPageModule {}
