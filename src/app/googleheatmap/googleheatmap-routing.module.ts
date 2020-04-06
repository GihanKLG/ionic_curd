import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoogleheatmapPage } from './googleheatmap.page';

const routes: Routes = [
  {
    path: '',
    component: GoogleheatmapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleheatmapPageRoutingModule {}
