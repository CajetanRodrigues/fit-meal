import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageSearchPageRoutingModule } from './image-search-routing.module';

import { ImageSearchPage } from './image-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageSearchPageRoutingModule
  ],
  declarations: [ImageSearchPage]
})
export class ImageSearchPageModule {}
