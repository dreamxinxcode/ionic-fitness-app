import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserWorkoutsPageRoutingModule } from './user-workouts-routing.module';

import { UserWorkoutsPage } from './user-workouts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserWorkoutsPageRoutingModule
  ],
  declarations: [UserWorkoutsPage]
})
export class UserWorkoutsPageModule {}
