import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsTabPageRoutingModule } from './settings-tab-routing.module';

import { SettingsTabPage } from './settings-tab.page';
import { ComponentsModule } from '../../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SettingsTabPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SettingsTabPage]
})
export class SettingsTabPageModule {}
