import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Change it to /tutorial later 
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'bmi',
    loadChildren: () => import('./pages/bmi/bmi.module').then(m => m.BmiPageModule),
  },
  {
    path: 'activity-body',
    loadChildren: () => import('./pages/activity-body/activity-body.module').then( m => m.ActivityBodyPageModule)
  },
  {
    path: 'meals',
    loadChildren: () => import('./pages/meals/meals.module').then( m => m.MealsPageModule)
  },
  {
    path: 'basket',
    loadChildren: () => import('./pages/basket/basket.module').then( m => m.BasketPageModule)
  },
  {
    path: 'add-meal',
    loadChildren: () => import('./pages/add-meal/add-meal.module').then( m => m.AddMealPageModule)
  },
  {
    path: 'routine',
    loadChildren: () => import('./pages/routine/routine.module').then( m => m.RoutinePageModule)
  },
  {
    path: 'image-search',
    loadChildren: () => import('./pages/image-search/image-search.module').then( m => m.ImageSearchPageModule)
  },
  {
    path: 'saved-routines',
    loadChildren: () => import('./pages/saved-routines/saved-routines.module').then( m => m.SavedRoutinesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
