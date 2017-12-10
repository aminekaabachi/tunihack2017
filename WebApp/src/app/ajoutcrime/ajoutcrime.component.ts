import { Component , Input} from '@angular/core';
import {Question } from "../question" ; 
import {Examen } from "../examen" ;
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { HttpModule }    from '@angular/http';
import {AdminService} from  './ajoutcrime.service' ;
import { Pipe, PipeTransform } from '@angular/core';



@Component({
  selector: 'my-crime',
  templateUrl: './ajoutcrime.component.html',
  styleUrls: ['./ajoutcrime.component.css']
})
export class AjoutCrimeComponent  {
  title = 'crime';

ngOnInit(){




}




}
