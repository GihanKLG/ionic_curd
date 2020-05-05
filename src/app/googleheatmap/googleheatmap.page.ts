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
  //map: any;
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
        zoom: 8,
        //mapTypeId: 'satellite'
        //mapTypeId: google.maps.MapTypeId.SATELLITE
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      //this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      var map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
      this.authService.getAccessId().then(id => {
      console.log(id);
      var url = 'https://nominatim.openstreetmap.org/search.php?q=Matara+District&polygon_geojson=1&format=json';
      console.log(url);

      this.http.get(url).subscribe((res:any) => { 
       var location =  res[0].geojson.coordinates[0];
      //  console.log(location);
       console.log(location.length);
       var i;
       var city = [];
       for(i=0;i<location.length;i++) {
        // location[i].lat = location[i][0];
        // location[i].lng = location[i][1];
        city.push({lat: location[i][1], lng: location[i][0]});
       }
       console.log(city);
      //  var triangleCoords = [
      //   {lat: 80.5207784, lng: -80.190},
      //   {lat: 18.466, lng: -66.118},
      //   {lat: 32.321, lng: -64.757},
      //   {lat: 25.774, lng: -80.190}
      // ];
       var cityPolygone = new google.maps.Polygon({
        paths: city,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });

      console.log(cityPolygone);
      cityPolygone.setMap(map);

       }); 
      }); 
    }).catch((error) => {
      console.log('Error getting location', error);
    });

   
  }



}
