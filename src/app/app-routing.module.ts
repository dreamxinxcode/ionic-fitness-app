import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'workouts-tab',
    loadChildren: () => import('./workouts-tab/workouts-tab.module').then( m => m.WorkoutsTabPageModule)
  },
  {
    path: 'meals-tab',
    loadChildren: () => import('./meals-tab/meals-tab.module').then( m => m.MealsTabPageModule)
  },
  {
    path: 'profile-tab',
    loadChildren: () => import('./profile-tab/profile-tab.module').then( m => m.ProfileTabPageModule)
  },
  {
    path: 'analytics-tab',
    loadChildren: () => import('./analytics-tab/analytics-tab.module').then( m => m.AnalyticsTabPageModule)
  },
  {
    path: 'settings-tab',
    loadChildren: () => import('./settings-tab/settings-tab.module').then( m => m.SettingsTabPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
