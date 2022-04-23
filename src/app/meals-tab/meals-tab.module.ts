import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealsTabPageRoutingModule } from './meals-tab-routing.module';

import { MealsTabPage } from './meals-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealsTabPageRoutingModule
  ],
  declarations: [MealsTabPage]
})
export class MealsTabPageModule {}
