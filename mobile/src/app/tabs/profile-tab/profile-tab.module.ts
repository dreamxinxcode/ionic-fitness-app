import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileTabPageRoutingModule } from './profile-tab-routing.module';
import { ProfileTabPage } from './profile-tab.page';
import { ComponentsModule } from '../../shared/components/components.module';
import { UserSearchSkeletonComponent } from './user-search-skeleton/user-search-skeleton.component';
import { UserPage } from './user/user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileTabPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProfileTabPage, 
    UserSearchSkeletonComponent,
    UserPage,
  ]
})
export class ProfileTabPageModule {}
