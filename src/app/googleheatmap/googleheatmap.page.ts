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
      var url = 'http://localhost/googlemap/svr/report.php?action=division_read&session_id=' + id;
      console.log(url);

      this.http.get(url).subscribe((res:any) => { 
        var result = res.details.Location; 
        //console.log(result);
        var i;
        var k = 0;
        for(i=0;i<result.length;i++) {
          if(result[i].count > 2) {
            const lt = result[i].lat;
            const lat = lt.split(",");

            const ln = result[i].lng;
            const lng = ln.split(",");

            var j
            var locations = [];
            for(j=0;j<lat.length;j++) {
              var latitude = Number(lat[j]);
              var longitude = Number(lng[j]);
              locations.push({lat: latitude, lng: longitude});
              
            }
            console.log(locations);
          //   var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          //   var markers = locations.map(function(location, i) {
          //     return new google.maps.Marker({
          //       position: location,
          //       label: labels[i % labels.length]
          //     });
          //   });
    
          //   // Add a marker clusterer to manage the markers.
          //   var markerCluster = new MarkerClusterer(map, markers,
          //       {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        
          }
        }

       }); 
      }); 
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    // this.directionsDisplay.setMap(this.map);
  }

  // getAddressFromCoords(lattitude, longitude) {
  //   console.log("getAddressFromCoords "+lattitude+" "+longitude);
  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  //   };
  //   console.log(lattitude);
  //   console.log(longitude);

  //   this.authService.getAccessId().then(id => {
  //     console.log(id);
    
  //    var url = 'http://localhost/googlemap/svr/report.php?action=read&session_id=' + id;
  //    console.log(url);

  //    this.http.get(url).subscribe((res:any) => { 
      
  //     var location = res.details.Location;
  //     var i;
  //     var heatmapData = [];

  //     for(i=0;i<location.length;i++) {
  //       var lat = Number(location[i].lat);
  //       var lng = Number(location[i].lng);

  //       heatmapData[i] = new google.maps.LatLng(lat, lng);
  //       //console.log(heatmapData[i]);
  //     } 

  //     var pointArray = new google.maps.MVCArray(heatmapData);
  //     var heatmap = new google.maps.visualization.HeatmapLayer({
  //       data: pointArray
  //     });
  //     heatmap.setMap(this.map);

  //   });

  // });
  // }

}
