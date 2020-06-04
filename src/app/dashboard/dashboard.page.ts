import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  selectedLicenseNo: any;
  loc_radius: any;
  loc_distance: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public appComponent: AppComponent,
    private storage: Storage,
    public http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadLicenceData();
  }

  addTransportDetails() {
    if (this.selectedLicenseNo !== undefined) {
      this.router.navigate(['/add-transport']);
    } else {
      alert('Please select a mining license');
    }
  }

  licesnseSelect() {
    console.log(this.appComponent.licenseInfo);
    for (const iterator of this.appComponent.licenseInfo) {
      if (iterator.license_no === this.selectedLicenseNo) {
        this.appComponent.selectedLicense = iterator;
        this.storage.set('selectedID', this.selectedLicenseNo);
        console.log(this.appComponent.selectedLicense);
      }
    }
  }
 
  loadLicenceData() {
    console.log('123456789');
    this.authService.getAccessId().then(id => {
      let sessionId = id;
      console.log(this.appComponent.dashboard_status);
      var locate_data = JSON.parse(this.route.snapshot.paramMap.get('loc_details'));
      console.log(locate_data);
      var locate_distance = locate_data[0];
      var loc_radius = locate_data[1];
      var url = 'http://localhost/gsmb/svr/dashboard.php?action=read'+'&session_id='+ sessionId +'&loc_radius='+ loc_radius + '&locate_distance='+ locate_distance;
      console.log(url);
      this.http.get(url).subscribe((res: any) => {
        console.log(res);
        this.appComponent.licenseInfo = res.details;
        this.storage.get('selectedID').then((resno: any) => {
          if (resno !== undefined) {
            this.selectedLicenseNo = resno;
            this.licesnseSelect();
          }
        });
      });
    });
   }
  }
