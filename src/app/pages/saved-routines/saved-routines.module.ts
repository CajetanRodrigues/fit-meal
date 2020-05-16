import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedRoutinesPageRoutingModule } from './saved-routines-routing.module';

import { SavedRoutinesPage } from './saved-routines.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedRoutinesPageRoutingModule
  ],
  declarations: [SavedRoutinesPage]
})
export class SavedRoutinesPageModule {}
