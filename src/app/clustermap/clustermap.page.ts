import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './../services/authentication.service';


declare var google;
declare var MarkerClusterer:any;

@Component({
  selector: 'app-clustermap',
  templateUrl: './clustermap.page.html',
  styleUrls: ['./clustermap.page.scss'],
})
export class ClustermapPage {
  @ViewChild('map', {static : false}) mapElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  address:string;
  maxZoomService;
  infoWindow;
  public locat: any = [];
  public markers: any[] = [];
  session_id: any = '';

  constructor(
    private geolocation: Geolocation,
    private authService: AuthenticationService, private nativeGeocoder: NativeGeocoder, private http: HttpClient) {
  }


  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: {lat: 6.983618, lng: 80.771703},
        zoom: 9,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      var map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      // this.session_id = this.authService.session_id;
      this.authService.getAccessId().then(id => {
       console.log(id);
     
      var url = 'http://localhost/googlemap/svr/report.php?action=read&session_id=' + id;
      console.log(url);

      this.http.get(url).subscribe((res:any) => {
        var location = res.details.Location;
        var j;
        var circle = [];

        for(j=0;j<location.length;j++) {
            location[j].lat = Number(location[j].lat);
            location[j].lng = Number(location[j].lng);
            circle[j] = new google.maps.Circle({
            strokeColor: 'purple',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'black',
            fillOpacity: 0.35,
            map: map,
            center: location[j],
            radius: 5
          });
        }

        console.log(location);
        var markers = location.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

      }); });}).catch((error) => {
        console.log('Error getting location', error);
      });

  }

}
