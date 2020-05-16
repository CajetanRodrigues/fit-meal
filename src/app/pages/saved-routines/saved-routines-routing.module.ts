import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedRoutinesPage } from './saved-routines.page';

const routes: Routes = [
  {
    path: '',
    component: SavedRoutinesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedRoutinesPageRoutingModule {}
