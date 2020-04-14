import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.page.html',
  styleUrls: ['./student-login.page.scss'],
})
export class StudentLoginPage implements OnInit {

  userName: any = '';
  password: any = '';
  loginDisable = true;
 
  constructor(private authService: AuthenticationService, public router: Router, private http: HttpClient) { }
 
  ngOnInit() {
  }

  enterUserName() {
    if (this.userName !== '' && this.password !== '') {
      this.loginDisable = false;
    }
  }

  enterPassword() {
    if (this.userName !== '' && this.password !== '') {
      this.loginDisable = false;
    }
  }
 
  login() {
    var url = 'http://localhost/60plus/svr/login.php?user=yakandawala&pass=test123';
    this.authService.login(url);
    this.authService.authenticationState.subscribe(state => {
      console.log(state);
      if (state) {
        this.router.navigate(['list']);
        console.log(this.authService.session_id);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
 
}