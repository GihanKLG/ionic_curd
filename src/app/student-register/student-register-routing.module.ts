import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentRegisterPage } from './student-register.page';

const routes: Routes = [
  {
    path: '',
    component: StudentRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRegisterPageRoutingModule {}
