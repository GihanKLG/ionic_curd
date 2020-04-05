import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentLoginPageRoutingModule } from './student-login-routing.module';

import { StudentLoginPage } from './student-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentLoginPageRoutingModule
  ],
  declarations: [StudentLoginPage]
})
export class StudentLoginPageModule {}
