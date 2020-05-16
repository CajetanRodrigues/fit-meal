import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageSearchPage } from './image-search.page';

const routes: Routes = [
  {
    path: '',
    component: ImageSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageSearchPageRoutingModule {}
