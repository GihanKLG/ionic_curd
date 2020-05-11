import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './../services/authentication.service';
import { Circle } from '@ionic-native/google-maps';
//import { AlertController } from 'ionic-angular';


declare var google;
declare var MarkerClusterer: any;

@Component({
  selector: 'app-clustermap',
  templateUrl: './clustermap.page.html',
  styleUrls: ['./clustermap.page.scss'],
})

export class ClustermapPage {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  address: string;
  maxZoomService;
  infoWindow;
  ma: any;
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

      this.ma = map;

      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      // this.session_id = this.authService.session_id;
      this.authService.getAccessId().then(id => {
        console.log(id);

        var url = 'http://localhost/googlemap/svr/report.php?action=read&session_id=' + id;
        console.log(url);

        this.http.get(url).subscribe((res: any) => {
          var location = res.details.Location;
          var j;
          var division = [];
          // var seq = [];

          for (j = 0; j < location.length; j++) {
            location[j].lat = Number(location[j].lat);
            location[j].lng = Number(location[j].lng);
            division[j] = location[j].Division;
            // seq[j] = location[j].seq;
            console.log(id[j]);
          }

          console.log(location);
          var InforObj = [];
          var markers = location.map(function (location, i) {
            // console.log(i);
            var marker = new google.maps.Marker({
              position: location,
              label: labels[i % labels.length]
              // label: "UDAYAGIRIGAMA SOUTH"
            });
            var contentString = '<div id="content"><p style="color:red">' + division[i] + '</p></div>';

            const infowindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 200
            });

            marker.addListener('click', function () {
              console.log(marker.label);
              //closeOtherInfo();
              infowindow.open(marker.get('map'), marker);
              InforObj[0] = infowindow;
            });
            //this.addInfoWindowToMarker(marker);
            return marker;
          });

          // Add a marker clusterer to manage the markers.
          var markerCluster = new MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

          //this.addInfoWindowToMarker(markers);
        });

        var url = 'http://localhost/googlemap/svr/report.php?action=division_read&session_id=' + id;
        console.log(url);

        this.http.get(url).subscribe((res: any) => {

          var circles = [];
          var result = res.details.Location;
          var info = [];
          // console.log(result.length);
          var i;
          // var k = 0;
          // var infowindow = new google.maps.InfoWindow();
          for (i = 0; i < result.length; i++) {
            const lt = result[i].lat;
            const lat = lt.split(",");

            const ln = result[i].lng;
            const lng = ln.split(",");

            var count = result[i].count;
            var rad = result[i].min_distance;
            var state = result[i].Division
            // console.log(i);
            // console.log(rad);
            //console.log(state);

            var j

            for (j = 0; j < lat.length; j++) {
              var latitude = Number(lat[j]);
              var longitude = Number(lng[j]);
              var r = rad[j];
              // var r = 7;
              var stroke = 'black';
              // var r = 
              if (r == 10) {
                // r = 2;
                stroke = 'red';
              } else if (r > 5) {
                // r = 3;
                stroke = 'yellow';
              } else if (r > 2) {
                // r = 4;
                stroke = 'green';
              } else {
                // r = 5;
                stroke = 'brown';
              }
              var circle = new google.maps.Circle({
                strokeColor: stroke,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: 'white',
                fillOpacity: 0.35,
                map: map,
                center: { lat: latitude, lng: longitude },
                radius: r,
                title: state
                // address: this.address
              });
              circles.push(circle);

              circle.setMap(map);
              //this.addInfoWindowToMarker(circle);

              //   google.maps.event.addListener(circle, 'click', function() {
              //     infowindow.setContent(state);
              //     infowindow.open(map, circle);
              // });

              //var opened_info = new google.maps.InfoWindow();
              // var infowindow = new google.maps.InfoWindow(
              //   {
              //       content:"<b>" + state + "</b>" + "</br>",
              //   });
              // var len = circles.length - 1;
              // console.log(len);
              // info[i] = infowindow;
              // circle.infowindow.name = state;
              // circle.setMap(map);
              // google.maps.event.addListener(circle, 'click', showInfo);

              // circle.addListener('click', function() {
              //   console.log(infowindow);
              //   infowindow.open(map, circle);
              // });

              //   function showInfo(event) {
              //      opened_info.close();
              //      console.log(this.infoWindow.name);
              //     if (opened_info.name != this.infowindow.name) {
              //         this.infowindow.setPosition(event.latLng);
              //         this.infowindow.open(map);
              //         opened_info = this.infowindow;
              //     }
              // }

              // console.log(j);
              // k = k + 1                 
            }
            // console.log(k);
          }

          console.log(circles);
          var place = latLng;
          var leastPositionData = find_closest_marker(place, circles);
          var leastposition = leastPositionData['leastposition'];
          console.log(leastPositionData);

          var icon = {
            url: '../../assets/icon/pin.png',
            scaledSize: new google.maps.Size(30, 30), // size
          };

          var currentlocation = new google.maps.Marker({
            position: latLng, //marker position
            map: map, //map already created
            icon: icon
          });

          var closestaddress = leastPositionData['closestaddress']
          var lesatminingcenter = new google.maps.Marker({
            position: leastposition, //marker position
            map: map, //map already created
            animation: google.maps.Animation.DROP,
            title: closestaddress
            // icon: icon 
          });
          this.addInfoWindowToMarker(lesatminingcenter);
          // var lesatminingcircle = leastPositionData['leastcircle'];
          // lesatminingcenter.setMap(this.ma);
          // this.addInfoWindowToMarker(lesatminingcircle);
          // google.maps.event.addListener(lesatminingcenter, 'click', function(){
          //   let infowindow = new google.maps.InfoWindow({
          //     content: closestaddress
          //   });
          //   infowindow.open(map,lesatminingcenter);
          // })



          //   let options: NativeGeocoderOptions = {
          //     useLocale: true,
          //     maxResults: 5
          // };

          // this.nativeGeocoder.reverseGeocode(6.2416854, 80.530781, options)
          //   .then((result: NativeGeocoderResult[]) => console.log(JSON.stringify(result[0])))
          //   .catch((error: any) => console.log(error));
          // let geocoder = new google.maps.Geocoder;
          // let sitelocation = {lat: 6.2416854, lng: 80.530781};
          // geocoder.geocode({'location': sitelocation}, (results, status) => {
          //   console.log(results); // read data from here
          //   console.log(status);
          // });

          var closesestdistance = leastPositionData['closesestdistance'];
          var needDistance = leastPositionData['needDistance'];

          if (closesestdistance <= needDistance) {
            console.log('You can add dispatch');
          } else {
            alert('You are not in minning site');
          }

        });

      });
    }).catch((error) => {
      console.log('Error getting location', error);
      alert('Error getting location');
    });

  }

  addInfoWindowToMarker(event) {
    // var size = markers.length;
    // var i;
    // for(i=0;i<size;i++) {
    // var event = markers[i]; 

    var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + event.label + '</h1></div>';
    console.log(infoWindowContent);
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    event.addListener('click', () => {
      // console.log(this.ma);
      // console.log(event);
      console.log(event.label);
      infoWindow.open(this.ma, event);
    });
  }
  //} 

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
  var lesatminingcircle = circle[closest];
  console.log(lesatminingcircle);
  // addInfoWindowToMarker(lesatminingcircle);
  var leastposition = circle[closest].center;
  var needDistance = circle[closest].radius;
  var closestaddress = circle[closest].title;
  var leastPositionData = [];

  //this.markers.push(mark[i]);
  leastPositionData['leastposition'] = leastposition;
  leastPositionData['needDistance'] = needDistance;
  leastPositionData['closesestdistance'] = closesestdistance;
  leastPositionData['closestaddress'] = closestaddress;
  leastPositionData['leastcircle'] = lesatminingcircle;
  console.log('Closest marker is: ' + circle[closest].center);
  console.log('closest distance is: ' + closesestdistance + ' m');
  console.log('needed distance is: ' + needDistance + ' m');
  console.log('closest address is: ' + closestaddress);
  console.log(leastposition);
  return leastPositionData;
}

// function addInfoWindowToMarker(marker) {
//   var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1></div>';
//   console.log(infoWindowContent);
//   var infoWindow = new google.maps.InfoWindow({
//     content: infoWindowContent
//   });
//   marker.addListener('click', () => {
//     console.log(this.ma);
//     console.log(marker);
//     infoWindow.open(this.ma, marker);
//   });
// }





