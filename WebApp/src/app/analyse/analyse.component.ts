
import {Question } from "../question" ;
import {Examen } from "../examen" ;
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { HttpModule }    from '@angular/http';
import {AdminService} from  './analyse.service' ;
import { Pipe, PipeTransform } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let d3: any;


@Component({
  selector: 'my-analyse',
  templateUrl: './analyse.component.html',
    styleUrls: [
    './analyse.component.css',
    '../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AnalyseComponent  {
  title = 'analyse';
  options;
  options2 ;
  options3;
  options4;
  data;
  data2;
  data3;
  data4;
  ques:any=[];
  sub:any;
  year:any;

  constructor(private http:Http,private route: ActivatedRoute) {}

  ngOnInit() {


     this.sub = this.route.params.subscribe(params => {
       this.year = params['year'];



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
          axisLabel: 'Mois'
        },
        yAxis: {
          axisLabel: 'Crimes',
          axisLabelDistance: -10
        }
      }
    }

    var call = this.http.get('http://127.0.0.1:5000/crimes/'+this.year+'/months',{}).map(res => res.json()) ;
    call.subscribe(d =>{
    this.data= [
    {
      key: "Crimes par mois",
      values: []
    }]

    for (var i = 1; i <= d.result.length; i++) {
    this.data[0].values.push({ "label" : "M"+i, "value" : Math.floor(d.result[i-1]/10)})
    }
    this.options.chart.update();
    }, ()=>console.log('Error'),() =>{} )




    this.options4 = {
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
          axisLabel: 'Nombre de crimes'
        },
        yAxis: {
          axisLabel: 'Jours de la semaine',
          axisLabelDistance: -10
        }
      }
    }

    var call = this.http.get('http://127.0.0.1:5000/crimes/'+this.year+'/weekdays',{}).map(res => res.json()) ;
    call.subscribe(d =>{
    this.data4= [
    {
      key: "Jours de la semaine",
      values: []
    }]

    for (var i = 1; i <= d.result.length; i++) {
    this.data4[0].values.push({ "label" : "D"+i, "value" : Math.floor(d.result[i-1]/10)})
    }
    this.options4.chart.update();
    }, ()=>console.log('Error'),() =>{} )


      this.options3 =  {
        chart: {
      type: 'pieChart',
      height: 500,
      x: function(d){return d.key;},
      y: function(d){return d.y;},
      showLabels: true,
      duration: 500,
      labelThreshold: 0.01,
      labelSunbeamLayout: true,
      showLegend:false,
        color: [
                 "#333",
                "#666",
                "#ccc",
                "#999"
                  ]
    }
  }

    var call = this.http.get('http://127.0.0.1:5000/crimes/'+this.year+'/types',{}).map(res => res.json()) ;
    call.subscribe(d => {
    this.data3= [
    {
      key: "Types of crimes",
      values: []
    }]
   var list = []
    for (var key in d.result) {
      list.push({ "key" : key, "y":Math.floor(d.result[key]/10)})
    }
    this.data3= list;

    this.options3.chart.update();
    }, ()=>console.log('Error'),() =>{} )

 this.options2 = {
            chart: {
                type: 'lineChart',
                height: 350,
                // width: 300,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                color: [
                 "#333",
                "#666",
                  ],
                x: function (d) { return d.x; },
                y: function (d) { return d.y; },
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Jours'
                },

                yAxis: {
                    axisLabel: 'Nombre de crimes',
                    tickFormat: function (d) {
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                },
                callback: () => {
                    console.log("callback");
                }
            }
        };


    var call = this.http.get('http://127.0.0.1:5000/crimes/'+this.year+'/days',{}).map(res => res.json()) ;
    call.subscribe(data =>{this.ques=data.result;
    this.data2 = this.sinAndCos();
    this.options2.chart.update();
    }, ()=>console.log('Error'),() =>{} )

    });



    }


    sinAndCos() {
        var sin = [], d = [],
            cos = [];

        //Data is represented as an array of {x,y} pairs.
        for (var i = 0; i < 356; i++) {
          /*
            sin.push({ x: i, y: Math.sin(i / 10) });
            sin2.push({ x: i, y: i % 10 == 5 ? null : Math.sin(i / 10) * 0.25 + 0.5 });*/
          cos.push({x: i, y: Math.floor(this.ques[i]/10)});
        }

        //Line chart data should be sent as an array of series objects.
        return [/*
            {
                values: sin,      //values - represents the array of {x,y} data points
                key: 'Sine Wave', //key  - the name of the series.
                color: '#000'  //color - optional: choose your own line color.
            },
            {
                values: cos,
                key: 'Cosine Wave',
                color: '#FFA500 '
            },*/
            {
                values: cos,
                key: 'Crimes par jour',
                color: '#000',
                area: false      //area - set to true if you want this line to turn into a filled area chart.
            }
        ];
    }




}
