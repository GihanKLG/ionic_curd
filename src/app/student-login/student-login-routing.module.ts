import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentLoginPage } from './student-login.page';

const routes: Routes = [
  {
    path: '',
    component: StudentLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentLoginPageRoutingModule {}
