import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GooglemapPageRoutingModule } from './googlemap-routing.module';

import { GooglemapPage } from './googlemap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GooglemapPageRoutingModule
  ],
  declarations: [GooglemapPage]
})
export class GooglemapPageModule {}
