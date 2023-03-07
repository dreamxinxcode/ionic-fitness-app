import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealsTabPageRoutingModule } from './meals-tab-routing.module';

import { MealsTabPage } from './meals-tab.page';
import { MealsSkeletonComponent } from './meals-skeleton/meals-skeleton.component';
import { MealSkeletonComponent } from './meal-skeleton/meal-skeleton.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealsTabPageRoutingModule
  ],
  declarations: [MealsTabPage, MealsSkeletonComponent, MealSkeletonComponent]
})
export class MealsTabPageModule {}
