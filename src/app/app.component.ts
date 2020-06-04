import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { LanguagePopoverPage } from './language-popover/language-popover.page';
import {
  Platform,
  ToastController,
  ActionSheetController,
  MenuController,
  PopoverController,
  ModalController
} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appConsts: any = { developed_by: { en: 'developed_by' }, powered_by: { en: 'Powered by' }, logout: { en: 'logout' } };
  licenseInfo: any;
  selectedLan: any = 'en';
  selectedLicense: any = {};
  navigate : any;
  status: any;
  dist: any;
  loc_radius: any;
  dashboard_status: any = false;
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    public http: HttpClient,
    private popoverCtrl: PopoverController,
    private authService: AuthenticationService
  ) {
    this.initializeApp();
  }

  public appPages = [
    // { title: 'Home', url: '/dashboard', icon: 'home' },
    // { title: 'Medicine', url: '/medicine', icon: 'medkit' },
    // { title: 'Meals', url: '/meals', icon: 'restaurant' },
    // { title: 'Vitals', url: '/vitals', icon: 'clipboard' },
    // // { title: 'Activities', url: '/activities', icon: 'walk' },
    // // { title: 'Resident', url: '/Resident', icon: 'contacts'},
    // { title: 'Centers', url: '/center', icon: 'photos' },
    // { title: 'Caregiver', url: '/Caregiver', icon: 'contact'},
    // { title: 'Reports', url: '/graph-pie', icon: 'stats' },
    // { title: 'Profile', url: '/profile', icon: 'person' },
    // { title: 'Logs', url: '/logs', icon: 'time' },
    { title: 'Log out', url: '/logout', icon: 'exit' },
  ];

  initializeApp() {
    //this.sideMenu();
    this.loadAppConsts();
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    // });
  }

  loadAppConsts() {
    this.authService.loadAppConsts().then((res: any) => {
      this.appConsts = res;
    });
  }

  async seletLanguage(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev,
      translucent: true
    });

    popover.onDidDismiss().then((lan) => {
      const tempLan = this.selectedLan;
      if (lan.data === null || lan.data === undefined || lan.data === '') {
        this.selectedLan = tempLan;
      } else {
        this.selectedLan = lan.data;
      }
    });
    return await popover.present();
  }

  onClick(name, url) {
    if (url === '/logout') {
      this.authService.logout();
      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['googlemap']);
        } else {
          this.router.navigate(['login']);
        }
      });
    }
  }

  
}
