import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'workouts',
        loadChildren: () => import('./workouts-tab/workouts-tab.module').then(m => m.WorkoutsTabPageModule)
      },
      {
        path: 'meals',
        loadChildren: () => import('./meals-tab/meals-tab.module').then(m => m.MealsTabPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile-tab/profile-tab.module').then(m => m.ProfileTabPageModule)
      },
      {
        path: 'analytics',
        loadChildren: () => import('./analytics-tab/analytics-tab.module').then(m => m.AnalyticsTabPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings-tab/settings-tab.module').then(m => m.SettingsTabPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/workouts',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/workouts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
