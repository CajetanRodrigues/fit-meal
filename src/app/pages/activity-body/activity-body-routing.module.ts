import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityBodyPage } from './activity-body.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityBodyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityBodyPageRoutingModule {}
