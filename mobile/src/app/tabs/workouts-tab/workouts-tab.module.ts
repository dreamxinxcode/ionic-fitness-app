import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { WorkoutsTabPageRoutingModule } from './workouts-tab-routing.module';

import { WorkoutsTabPage } from './workouts-tab.page';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutsSkeletonComponent } from './workouts-skeleton/workouts-skeleton.component';
import { ComponentsModule } from '../../shared/components/components.module';
import { ExercisesComponent } from './exercises/exercises.component';
import { TemplateFormComponent } from './template-form/template-form.component';


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
    TemplateFormComponent,
  ],
})
export class WorkoutsTabPageModule {}
