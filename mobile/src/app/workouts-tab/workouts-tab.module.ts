import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { WorkoutsTabPageRoutingModule } from './workouts-tab-routing.module';

import { WorkoutsTabPage } from './workouts-tab.page';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutsSkeletonComponent } from './workouts-skeleton/workouts-skeleton.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutsTabPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [WorkoutsTabPage, WorkoutComponent, WorkoutsSkeletonComponent],
})
export class WorkoutsTabPageModule {}
