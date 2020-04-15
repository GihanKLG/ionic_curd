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
 
  constructor(private authService: AuthenticationService, public router: Router, private storage: Storage, private http: HttpClient) { }
 
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
 
  // login() {
  //   var url = 'http://localhost/googlemap/svr/login.php?user=' + this.userName + '&pass=' + this.password;
  //   this.authService.login(url);
  //   this.authService.authenticationState.subscribe(state => {
  //     console.log(state);
  //     if (state) {
  //       this.authService.checkToken().then(id => {
  //         console.log(id);
  //         this.router.navigate(['clustermap']);
  //       });
  //     } else {
  //       console.log('error authentication');
  //       this.router.navigate(['login']);
  //     }
  //   });
  // }

  login() {
    this.loginDisable = true;
    const url = 'http://localhost/googlemap/svr/login.php?user=' + this.userName + '&pass=' + this.password;
     console.log(url);
     this.http.get(url).subscribe((res:any) => {
      const session_id = res.details.session_id;
      // this.audit.debug(res);
      this.storage.set('accessId', session_id).then( (savedId) => {
        this.authService.accessId = savedId;
        console.log(this.authService.accessId);
        this.router.navigate(['clustermap']);
      //   this.appData.accessId = savedId;
      //   console.log( this.appData.accessId)

      });
    });
  }
 
}