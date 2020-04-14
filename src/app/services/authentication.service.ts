import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
 
const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
  session_id: any;
 
  constructor(private storage: Storage, private plt: Platform, private http: HttpClient) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
 
  login(url) {
    //return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
      console.log(url);
      this.http.get('http://localhost/60plus/svr/login.php?user=yakandawala&pass=test123').subscribe((res:any) => {
        this.session_id = res.details.session_id;
        // console.log(this.session_id);
        this.authenticationState.next(true);
      });
      
   // });
  }
 
  logout() {
   // return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
   // });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}