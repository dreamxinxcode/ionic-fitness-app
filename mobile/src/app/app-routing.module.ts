import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule),
  },
  {
    path: 'moments',
    loadChildren: () => import('./pages/moments/moments.module').then( m => m.MomentsModule),
  },
  {
    path: 'workouts-tab',
    loadChildren: () => import('./tabs/workouts-tab/workouts-tab.module').then( m => m.WorkoutsTabPageModule),
  },
  {
    path: 'meals-tab',
    loadChildren: () => import('./tabs/meals-tab/meals-tab.module').then( m => m.MealsTabPageModule),
  },
  {
    path: 'profile-tab',
    loadChildren: () => import('./tabs/profile-tab/profile-tab.module').then( m => m.ProfileTabPageModule),
  },
  {
    path: 'analytics-tab',
    loadChildren: () => import('./tabs/analytics-tab/analytics-tab.module').then( m => m.AnalyticsTabPageModule),
  },
  {
    path: 'settings-tab',
    loadChildren: () => import('./tabs/settings-tab/settings-tab.module').then( m => m.SettingsTabPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
