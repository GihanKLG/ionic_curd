import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google;

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.page.html',
  styleUrls: ['./googlemap.page.scss'],
})
export class GooglemapPage {

  @ViewChild('map', {static : false}) mapElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  map: any;
  address:string;
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
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

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
    const pos = {
      lat: 6.959515,
      lng: 80.603027
    };
      
    const marker = new google.maps.Marker({
      position: pos, //marker position
      map: this.map, //map already created
      animation: google.maps.Animation.DROP,
    });
    this.markers.push(marker);

    const pos1 = {
      lat: lattitude,
      lng: longitude
    };  

    const marker1 = new google.maps.Marker({
      position: pos1, //marker position
      map: this.map, //map already created
      animation: google.maps.Animation.DROP,
    });
    this.markers.push(marker1);


    // var outerCoords = [
    //   {lat: 6.959515, lng: 80.603027}, // north west
    //   {lat: 7.011523, lng: 80.603027}, // south west
    //   {lat: 7.011523, lng: 80.903027}, // south east
    //   {lat: 6.959515, lng: 80.903027}  // north east
    // ];
  
    // var polyline = new google.maps.Data.Polygon({
    //   map: this.map,
    //   points: outerCoords,
    //   'color' : '#AA00FF',
    //   'width': 10,
    //   'geodesic': true
    // });
    // Define the LatLng coordinates for an inner path.
    // var innerCoords1 = [
    //   {lat: -33.364, lng: 154.207},
    //   {lat: -34.364, lng: 154.207},
    //   {lat: -34.364, lng: 155.207},
    //   {lat: -33.364, lng: 155.207}
    // ];
    
    //this.map.data.add({geometry: new google.maps.Data.Polygon([outerCoords])});
    

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

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    const that = this;
    this.directionsService.route({
      origin: { lat: lattitude, lng: longitude },
      destination: { lat: 6.959515, lng: 80.603027 },
      travelMode: 'DRIVING'
    }, (response, status) => {
      console.log(response, status);
     // if(status === 'OK'){
        that.directionsDisplay.setDirections(response);
      // } else {
      //   window.alert('Directions request failed due to ' + status);
      //}

    });

    
    // this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
    //   .then((result: NativeGeocoderResult[]) => {
    //     this.address = "";
    //     let responseAddress = [];
    //     for (let [key, value] of Object.entries(result[0])) {
    //       if(value.length>0)
    //       responseAddress.push(value);

    //     }
    //     responseAddress.reverse();
    //     for (let value of responseAddress) {
    //       this.address += value+", ";
    //     }
    //     this.address = this.address.slice(0, -2);
    //   })
    //   .catch((error: any) =>{ 
    //     this.address = "Address Not Available!";
    //     console.log(error);
    //   });

  }


}
