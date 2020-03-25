import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.page.html',
  styleUrls: ['./student-login.page.scss'],
})
export class StudentLoginPage implements OnInit {
 
  constructor(private authService: AuthenticationService, public router: Router) { }
 
  ngOnInit() {
  }
 
  login() {
    this.authService.login();
    this.authService.authenticationState.subscribe(state => {
      console.log(state);
      if (state) {
        this.router.navigate(['list']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
 
}