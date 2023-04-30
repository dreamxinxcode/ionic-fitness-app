import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutTemplatesPageRoutingModule } from './workout-templates-routing.module';

import { WorkoutTemplatesPage } from './workout-templates.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    WorkoutTemplatesPageRoutingModule
  ],
  declarations: [WorkoutTemplatesPage]
})
export class WorkoutTemplatesPageModule {}
