import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './../services/authentication.service';
import { Circle } from '@ionic-native/google-maps';

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
      this.authService.getAccessId().then(id => {
      var url = 'http://localhost/googlemap/svr/report.php?action=read&location=LatLng'+latLng+'&session_id=' + id;
      
        this.http.get(url).subscribe((res: any) => {
          var location = res.details.Location;
          var j;
          var division = [];

          for (j = 0; j < location.length; j++) {
            location[j].lat = Number(location[j].lat);
            location[j].lng = Number(location[j].lng);
            division[j] = location[j].Division;
          }

          var InforObj = [];
          var markers = location.map(function (location, i) {
            var marker = new google.maps.Marker({
              position: location,
              label: labels[i % labels.length]
            });
            var contentString = '<div id="content"><p style="color:red">' + division[i] + '</p></div>';

            const infowindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 200
            });

            marker.addListener('click', function () {
              infowindow.open(marker.get('map'), marker);
              InforObj[0] = infowindow;
            });
            return marker;
          });

          // Add a marker clusterer to manage the markers.
          var markerCluster = new MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
        });

        var url = 'http://localhost/googlemap/svr/report.php?action=division_read&session_id=' + id;
 
        this.http.get(url).subscribe((res: any) => {

          var circles = [];
          var result = res.details.Location;
          var info = [];
          var i;
          for (i = 0; i < result.length; i++) {
            const lt = result[i].lat;
            const lat = lt.split(",");

            const ln = result[i].lng;
            const lng = ln.split(",");

            var count = result[i].count;
            var rad = result[i].min_distance;
            var state = result[i].Division
            var j

            for (j = 0; j < lat.length; j++) {
              var latitude = Number(lat[j]);
              var longitude = Number(lng[j]);
              var r = rad[j];
              var stroke = 'black';
              if (r == 10) {
                stroke = 'red';
              } else if (r > 5) {
                stroke = 'yellow';
              } else if (r > 2) {
                stroke = 'green';
              } else {
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
              });
              circles.push(circle);

              circle.setMap(map);
            }
          }
          var place = latLng;
          var leastPositionData = find_closest_marker(place, circles);
          var leastposition = leastPositionData['leastposition'];
  
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

    var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + event.label + '</h1></div>';
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    event.addListener('click', () => {
       infoWindow.open(this.ma, event);
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
  var lesatminingcircle = circle[closest];
  var leastposition = circle[closest].center;
  var needDistance = circle[closest].radius;
  var closestaddress = circle[closest].title;
  var leastPositionData = [];
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







