import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealsFilterPage } from './meals-filter.page';

const routes: Routes = [
  {
    path: '',
    component: MealsFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsFilterPageRoutingModule {}
