import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityBodyPageRoutingModule } from './activity-body-routing.module';

import { ActivityBodyPage } from './activity-body.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityBodyPageRoutingModule
  ],
  declarations: [ActivityBodyPage]
})
export class ActivityBodyPageModule {}
