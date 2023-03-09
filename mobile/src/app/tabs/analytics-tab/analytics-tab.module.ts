import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalyticsTabPageRoutingModule } from './analytics-tab-routing.module';

import { AnalyticsTabPage } from './analytics-tab.page';
import { ComponentsModule } from '../../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalyticsTabPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AnalyticsTabPage]
})
export class AnalyticsTabPageModule {}
