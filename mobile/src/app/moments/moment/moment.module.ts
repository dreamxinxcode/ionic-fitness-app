import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MomentPageRoutingModule } from './moment-routing.module';

import { MomentPage } from './moment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentPageRoutingModule
  ],
  declarations: [MomentPage]
})
export class MomentPageModule {}
