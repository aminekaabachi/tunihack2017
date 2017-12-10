import { Component , Input} from '@angular/core';
import {Question } from "../question" ; 
import {Examen } from "../examen" ;
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { HttpModule }    from '@angular/http';
import {AdminService} from  './prediction.service' ;
import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MapsAPILoader, AgmMap } from '@agm/core';    // Added AgmMap
import { ViewChild, OnInit } from '@angular/core'



@Component({
  selector: 'my-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent  {
  title = 'prediction';
  lat: number = 36.8190;  
  lng: number = 10.1658;
   options;
   data;
      options2;
   data2;
  zoom: number = 15;
  dis: any;
  lats: any[];
  lngs: any[];
 Math;
  @ViewChild('map') map: AgmMap;   
  constructor(private http:Http) {
    this.Math = Math;
  }

  ngOnInit(){
    
    this.lats = [
      36.8190,
      36.8180,
      36.9170,
      36.8190,
      36.9150,
      36.8143,
      36.8176,
      36.8186,
      36.8195,
      36.7181,
    ]

    this.lngs = [
      10.1658,
      10.1990,
      10.1657,
      10.1658,
      10.1843,
      10.1658,
      10.1658,
      10.1658,
      10.1995,
      10.1681,
    ]

     var call = this.http.get('http://127.0.0.1:5000/crimes/2017/district',{}).map(res => res.json()) ;
    call.subscribe(d =>{
    this.dis = d.result.slice(0, 10)
    }, ()=>console.log('Error'),() =>{} ) 
    
      
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 350,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
                color: [
      "#000"
    ],
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    }

    var call = this.http.get('http://127.0.0.1:5000/crimes/2017/days',{}).map(res => res.json()) ;
    call.subscribe(d =>{
    this.data= [
    {
      key: "Crimes par mois",
      values: []
    }]
   
    for (var i = 1; i <= 7; i++) {
    this.data[0].values.push({ "label" : i, "value" : Math.floor(d.result[i-1]/10)})
    }
    this.options.chart.update();
    }, ()=>console.log('Error'),() =>{} ) 


     this.options2 = {
      chart: {
        type: 'discreteBarChart',
        height: 350,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
                color: [
      "#000"
    ],
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    }

    var call = this.http.get('http://127.0.0.1:5000/crimes/2017/weekdays',{}).map(res => res.json()) ;
    call.subscribe(d =>{
    this.data2= [
    {
      key: "Crimes par mois",
      values: []
    }]
   
    for (var i = 1; i <= d.result.length; i++) {
    this.data2[0].values.push({ "label" : i, "value" : Math.floor(d.result[i-1]/10)})
    }
    this.options.chart.update();
    }, ()=>console.log('Error'),() =>{} ) 

      this.resizeMap();
      
  }



    

  resizeMap() {
      this.map.styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]
      this.map.triggerResize();
  }




}
