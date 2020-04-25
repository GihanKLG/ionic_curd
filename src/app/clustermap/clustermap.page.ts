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
        center: latLng,
        zoom: 10,
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

        for(j=0;j<location.length;j++) {
            location[j].lat = Number(location[j].lat);
            location[j].lng = Number(location[j].lng);
        }    

        console.log(location);
        var markers = location.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // // Add a marker clusterer to manage the markers.
        // var markerCluster = new MarkerClusterer(map, markers,
        //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

     
          });  
          
        var url = 'http://localhost/googlemap/svr/report.php?action=division_read&session_id=' + id;
        console.log(url);

        this.http.get(url).subscribe((res:any) => {

          var circles = [];
          var result = res.details.Location; 
          console.log(result);
          var i;
          // var k = 0;
          for(i=0;i<result.length;i++) {
              const lt = result[i].lat;
              const lat = lt.split(",");
  
              const ln = result[i].lng;
              const lng = ln.split(",");

              var count = result[i].count;
              console.log(count);
  
              var j
              for(j=0;j<lat.length;j++) {
                var latitude = Number(lat[j]);
                var longitude = Number(lng[j]);
                var r = 7;
                var stroke = 'black';
                if(count < 200 && count > 190) {
                  r = 2;
                  stroke = 'red';
                } 
                else if(count > 150) {
                  r = 3;
                  stroke = 'yellow';
                }
                else if(count > 100) {
                  r = 4;
                  stroke = 'green';
                }
                else if(count > 50) {
                  r = 5;
                  stroke = 'brown';
                }
                var circle = new google.maps.Circle({
                strokeColor: stroke,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: 'white',
                fillOpacity: 0.35,
                map: map,
                center: {lat: latitude, lng: longitude},
                radius: r
                }); 
                circles.push(circle);
                // console.log(j);
                // k = k + 1                 
            }
            // console.log(k);
          } 
        console.log(circles);
        var place = latLng;
        var leastposition = find_closest_marker(place, circles); 
        
        var icon = {
          url: '../../assets/icon/pin.png',
          scaledSize: new google.maps.Size(30, 30), // size
        };
        
        var currentlocation = new google.maps.Marker ({
          position: latLng, //marker position
          map: map, //map already created
          icon: icon
        });
        var lesatminingcenter = new google.maps.Marker({
          position: leastposition, //marker position
          map: map, //map already created
          // icon: icon 
        });

      });         
      
       });
          }).catch((error) => {
            console.log('Error getting location', error);
        });

  }

}

function find_closest_marker(place, circle) {
  var distances = [];
  var closest = -1;
  var closesestdistance;
  var i;
  for (i = 0; i < circle.length; i++) {
      var d = google.maps.geometry.spherical.computeDistanceBetween(circle[i].center, place);
      distances[i] = d;
      if (closest == -1 || d < distances[closest]) {
          closest = i;
          closesestdistance = d;
      }
  }
  console.log(place);
  var leastposition = circle[closest].center;

  //this.markers.push(mark[i]);
  console.log('Closest marker is: ' + circle[closest].center);
  console.log('closest distance is: ' + closesestdistance + 'm');
  return leastposition;
}

