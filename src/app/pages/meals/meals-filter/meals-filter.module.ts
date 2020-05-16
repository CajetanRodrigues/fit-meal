import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealsFilterPageRoutingModule } from './meals-filter-routing.module';

import { MealsFilterPage } from './meals-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealsFilterPageRoutingModule
  ],
  declarations: [MealsFilterPage]
})
export class MealsFilterPageModule {}
