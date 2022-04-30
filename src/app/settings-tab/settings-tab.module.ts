import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsTabPageRoutingModule } from './settings-tab-routing.module';

import { SettingsTabPage } from './settings-tab.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SettingsTabPageRoutingModule
  ],
  declarations: [SettingsTabPage]
})
export class SettingsTabPageModule {}
