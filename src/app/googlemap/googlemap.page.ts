import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { MarkerCluster } from "@ionic-native/google-maps";

declare var google;
declare var MarkerClusterer:any;

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
        zoom: 8,
        //mapTypeId: 'satellite'
        mapTypeId: google.maps.MapTypeId.SATELLITE
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

    var i;
    var mark = [];
    var locations = [
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
      {lat: lattitude, lng: longitude} 
    ];

    var icon = {
          url: '../../assets/icon/pin.png',
          scaledSize: new google.maps.Size(20, 20), // size
      };

    for (i = 0; i < locations.length; i++) {  
         mark[i] = new google.maps.Marker({
          position: locations[i], //marker position
          map: this.map, //map already created
          icon: icon 
        });
        this.markers.push(mark[i]);
      }
  
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
      
      // var markerCluster = new MarkerClusterer(this.map, this.markers,
      //   {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      // let markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
      //   markers: this.markers,
      //   map: this.map,
      //   icons: [
      //     {
      //       min: 3,
      //       max: 9,
      //       url: "./assets/markercluster/small.png",
      //       label: {
      //         color: "white"
      //       }
      //     },
      //     {
      //       min: 10,
      //       url: "./assets/markercluster/large.png",
      //       label: {
      //         color: "white"
      //       }
      //     }
      //   ]
      // });    

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


    // var trafficLayer = new google.maps.TrafficLayer();
    // trafficLayer.setMap(this.map);

    // var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // var locations = [
    //   {lat: -31.563910, lng: 147.154312},
    //   {lat: -33.718234, lng: 150.363181},
    //   {lat: -33.727111, lng: 150.371124},
    //   {lat: -33.848588, lng: 151.209834},
    //   {lat: -33.851702, lng: 151.216968},
    //   {lat: -34.671264, lng: 150.863657},
    //   {lat: -35.304724, lng: 148.662905},
    //   {lat: -36.817685, lng: 175.699196},
    //   {lat: -36.828611, lng: 175.790222},
    //   {lat: -37.750000, lng: 145.116667},
    //   {lat: -37.759859, lng: 145.128708},
    //   {lat: -37.765015, lng: 145.133858},
    //   {lat: -37.770104, lng: 145.143299},
    //   {lat: -37.773700, lng: 145.145187},
    //   {lat: -37.774785, lng: 145.137978},
    //   {lat: -37.819616, lng: 144.968119},
    //   {lat: -38.330766, lng: 144.695692},
    //   {lat: -39.927193, lng: 175.053218},
    //   {lat: -41.330162, lng: 174.865694},
    //   {lat: -42.734358, lng: 147.439506},
    //   {lat: -42.734358, lng: 147.501315},
    //   {lat: -42.735258, lng: 147.438000},
    //   {lat: -43.999792, lng: 170.463352}
    // ]

    // var markers = locations.map(function(location, i) {
    //   return new google.maps.Marker({
    //     position: location,
    //     label: labels[i % labels.length]
    //   });
    // });

    // var markerCluster = new markerCluster(this.map, markers,
    //   {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    

    // const map = this.map;
    // map.addListener('click', this.showMaxZoom);


    // var panorama = new google.maps.StreetViewPanorama(
    //   document.getElementById('pano'), {
    //     position: {lat: 37.869260, lng: -122.254811},
    //     pov: {heading: 165, pitch: 0},
    //     motionTrackingControlOptions: {
    //       position: google.maps.ControlPosition.LEFT_BOTTOM
    //     }
    //   });
  
    
    // var kmlLayer = new google.maps.KmlLayer();
     
    // var src = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
    // var kmlLayer = new google.maps.KmlLayer(src, {
    //   suppressInfoWindows: true,
    //   preserveViewport: false,
    //   map: this.map
    // });


    // var directionsService = new google.maps.DirectionsService();
    
    // var request = {
    //   origin: { lat: lattitude, lng: longitude },
    //   destination: { lat: 6.959515, lng: 80.603027 },
    //   travelMode: 'DRIVING'
    // };

    // directionsService.route(request, function(response, status) {
    //   if (status == 'OK') {
    //     console.log(response, status);
    //   }
    // });
  
  

    // directionsDisplay.setMap(this.map);
    // const that = this;
    // this.directionsService.route({
    //   origin: { lat: lattitude, lng: longitude },
    //   destination: { lat: 6.959515, lng: 80.603027 },
    //   provideRouteAlternatives: false,
    //   travelMode: 'DRIVING'
    //   drivingOptions: {
    //     departureTime: new Date(/* now, or future date */),
    //     trafficModel: 'pessimistic'
    //   },
    //   unitSystem: google.maps.UnitSystem.IMPERIAL
    // }, (response, status) => {
    //   console.log(response, status);
    //  // if(status === 'OK'){
    //     that.directionsDisplay.setDirections(response);
      // } else {
      //   window.alert('Directions request failed due to ' + status);
      //}

    // });

    
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
  


