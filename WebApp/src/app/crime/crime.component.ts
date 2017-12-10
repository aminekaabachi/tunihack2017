import { Component , Input} from '@angular/core';
import {Question } from "../question" ; 
import {Examen } from "../examen" ;
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { HttpModule }    from '@angular/http';
import {AdminService} from  './crime.service' ;
import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';



@Component({
  selector: 'my-crime',
  templateUrl: './crime.component.html',
  styleUrls: ['./crime.component.css']
})
export class CrimeComponent  {
  title = 'crime';
items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
  }
ngOnInit(){




}




}
