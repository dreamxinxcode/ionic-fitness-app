import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MomentsFeedComponent } from './moments-feed/moments-feed.component';



@NgModule({
  declarations: [MenuComponent, HeaderComponent, MomentsFeedComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
  ],
  exports: [MenuComponent, HeaderComponent, MomentsFeedComponent]
})
export class ComponentsModule { }
