import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GooglemapPage } from './googlemap.page';

const routes: Routes = [
  {
    path: '',
    component: GooglemapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GooglemapPageRoutingModule {}
