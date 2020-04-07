import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClustermapPageRoutingModule } from './clustermap-routing.module';

import { ClustermapPage } from './clustermap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClustermapPageRoutingModule
  ],
  declarations: [ClustermapPage]
})
export class ClustermapPageModule {}
