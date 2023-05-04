import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacySettingsPageRoutingModule } from './privacy-settings-routing.module';

import { PrivacySettingsPage } from './privacy-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacySettingsPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PrivacySettingsPage]
})
export class PrivacySettingsPageModule {}
