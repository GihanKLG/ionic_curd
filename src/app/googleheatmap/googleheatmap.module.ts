import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoogleheatmapPageRoutingModule } from './googleheatmap-routing.module';

import { GoogleheatmapPage } from './googleheatmap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleheatmapPageRoutingModule
  ],
  declarations: [GoogleheatmapPage]
})
export class GoogleheatmapPageModule {}
