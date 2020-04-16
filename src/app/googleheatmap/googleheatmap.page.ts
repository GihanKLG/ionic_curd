import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { MarkerCluster } from "@ionic-native/google-maps";
import { AuthenticationService } from './../services/authentication.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

declare var google;
declare var MarkerClusterer:any;

@Component({
  selector: 'app-googleheatmap',
  templateUrl: './googleheatmap.page.html',
  styleUrls: ['./googleheatmap.page.scss'],
})
export class GoogleheatmapPage {

  @ViewChild('map', {static : false}) mapElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  map: any;
  address:string;
  maxZoomService;
  infoWindow;
  
  public markers: any[] = [];

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder, private authService: AuthenticationService, private http: HttpClient) {
  }


  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 18,
        //mapTypeId: 'satellite'
        mapTypeId: google.maps.MapTypeId.SATELLITE
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.setTilt(45);

      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map);
        //this.directionsDisplay.setMap(this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    // this.directionsDisplay.setMap(this.map);
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    console.log(lattitude);
    console.log(longitude);

    this.authService.getAccessId().then(id => {
      console.log(id);
    
     var url = 'http://localhost/googlemap/svr/report.php?action=read&session_id=' + id;
     console.log(url);

     this.http.get(url).subscribe((res:any) => { 
      
      var location = res.details.Location;
      var i;
      var heatmapData = [];

      for(i=0;i<location.length;i++) {
        var lat = Number(location[i].lat);
        var lng = Number(location[i].lng);

        heatmapData[i] = new google.maps.LatLng(lat, lng);
        //console.log(heatmapData[i]);
      } 

      var pointArray = new google.maps.MVCArray(heatmapData);
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray
      });
      heatmap.setMap(this.map);

    });

  });
  }

}
