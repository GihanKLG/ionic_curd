import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


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
        center: {lat: 6.983618, lng: 80.771703},
        zoom: 9,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      var map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      var location = [
        {lat: 6.959515, lng: 80.603027},
        {lat: 8.243478, lng: 81.131043},
        {lat: 8.234277, lng: 81.125274},
        {lat: 8.209265, lng: 81.105157},
        {lat: 8.233463, lng: 81.125672},
        {lat: 6.165987, lng: 80.271010},
        {lat: 6.151515, lng: 80.292345},
        {lat: 8.235683, lng: 81.125802},
        {lat: 8.201049, lng: 81.111349},
        {lat: 8.233326, lng: 81.125724},
        {lat: 8.225308, lng: 81.124102},
        {lat: 8.244872, lng: 81.125304},
        {lat: 6.450889, lng: 80.038218},
        {lat: 6.173025, lng: 80.203362},
        {lat: 6.151114, lng: 80.273284},
        {lat: 6.983618, lng: 80.771703}
      ]

      var markers = location.map(function(location, i) {
        return new google.maps.Marker({
          position: location,
          label: labels[i % labels.length]
        });
      });

      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(map, markers,
          {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

      var circle = [];
      var i;      
      
      for (i = 0; i < location.length; i++) {  
        circle[i] = new google.maps.Circle({
          strokeColor: 'purple',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: 'black',
          fillOpacity: 0.35,
          map: map,
          center: location[i],
          radius: 100
        });
      }  

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

}
