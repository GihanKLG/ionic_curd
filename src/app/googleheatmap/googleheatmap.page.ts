import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { MarkerCluster } from "@ionic-native/google-maps";

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
    private nativeGeocoder: NativeGeocoder) {
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

 
      var heatmapData = [
        new google.maps.LatLng(6.959515, 80.603027),
        new google.maps.LatLng(8.243478, 81.131043),
        new google.maps.LatLng(8.234277, 81.125274),
        new google.maps.LatLng(8.209265, 81.105157),
        new google.maps.LatLng(8.233463, 81.125672),
        new google.maps.LatLng(6.165987, 80.271010),
        new google.maps.LatLng(6.151515, 80.292345),
        new google.maps.LatLng(8.235683, 81.125802),
        new google.maps.LatLng(8.201049, 81.111349),
        new google.maps.LatLng(8.233326, 81.125724),
        new google.maps.LatLng(8.225308, 81.124102),
        new google.maps.LatLng(8.244872, 81.125304),
        new google.maps.LatLng(6.450889, 80.038218),
        new google.maps.LatLng(6.173025, 80.203362),
        new google.maps.LatLng(6.151114, 80.273284),
        new google.maps.LatLng(6.431923, 80.375463),
        new google.maps.LatLng(6.364028, 80.38032),
        new google.maps.LatLng(6.431923, 80.375464),
        new google.maps.LatLng(6.364028, 80.38033)
        
      ];
      
      var pointArray = new google.maps.MVCArray(heatmapData);
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray
      });
      heatmap.setMap(this.map);
      
    let points = [
      {lat: 6.959515, lng: 80.603027}, // north west
      {lat: 6.969550, lng: 80.603027}, // south west
      {lat: 6.969550, lng: 80.614030}, // south east
      {lat: 6.959515, lng: 80.614030}  // north east
    ];

    var polyline = new google.maps.Polygon({
      map: this.map,
      path: points,
      'color' : '#AA00FF',
      'width': 10,
      'geodesic': true
    });

    let points1 = [
      {lat: 6.859515, lng: 80.603027}, // north west
      {lat: 6.869550, lng: 80.603027}, // south west
      {lat: 6.869550, lng: 80.614030}, // south east
      {lat: 6.859515, lng: 80.614030}  // north east
    ];

    var polyline1 = new google.maps.Polygon({
      map: this.map,
      path: points,
      'color' : '#AA00FF',
      'width': 10,
      'geodesic': true
    });
 

  }


}
