import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClustermapPage } from './clustermap.page';

const routes: Routes = [
  {
    path: '',
    component: ClustermapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClustermapPageRoutingModule {}
