import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealsPage } from './meals.page';

const routes: Routes = [
  {
    path: '',
    component: MealsPage
  },
  {
    path: 'meals-filter',
    loadChildren: () => import('./meals-filter/meals-filter.module').then( m => m.MealsFilterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsPageRoutingModule {}
