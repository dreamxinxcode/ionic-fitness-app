import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { WorkoutsTabPageRoutingModule } from './workouts-tab-routing.module';

import { WorkoutsTabPage } from './workouts-tab.page';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutsSkeletonComponent } from './workouts-skeleton/workouts-skeleton.component';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { ComponentsModule } from '../../shared/components/components.module';
import { ExercisesComponent } from './exercises/exercises.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutsTabPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [
    WorkoutsTabPage, 
    WorkoutComponent, 
    WorkoutsSkeletonComponent,
    ExercisesComponent,
  ],
})
export class WorkoutsTabPageModule {}
