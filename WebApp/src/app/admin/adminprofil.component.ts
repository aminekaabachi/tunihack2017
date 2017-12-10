import { Component , Input} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { HttpModule }    from '@angular/http';
import {AdminService} from  './admin.service' ;
import { Pipe, PipeTransform } from '@angular/core';



@Component({
  selector: 'my-profil',
  templateUrl: './adminprofil.component.html',
  styleUrls: ['./adminprofil.component.css']
})
export class AdminProfilComponent  {
      manager:any=[] ; 
  profil:any="" ;
  description:any="" ;
  profils:any=[] ;
  examen:any=[] ; 
  detail=false ;
  page=1 ; 
  idprofil:any ;
    constructor (public adminservice: AdminService){}

    getexam(){

  this.adminservice.getexam().subscribe(data =>this.examen=data , ()=>console.log('Error'),() =>{ } ) 
  
}

    getmanager(){
    this.page=2 ;
    this.adminservice.getmanager().subscribe(data => {this.manager=data},()=> console.log('error') , ()=>{console.log(this.manager)}   ) ;
  }

postprofil(){
  
   this.adminservice.postprofil(this.profil,this.description,this.manager).subscribe(data => {},()=> console.log('error') , ()=>{this.getallprofil();this.description="";this.profil="";this.manager=[] ;this.page=1 ;}  ) ;
}

getallprofil(){
    this.adminservice.getallprofil().subscribe(data =>{this.profils=data} , ()=>{console.log('error')},() =>{} ) ; 
}

fermerajout(){
  this.page=1 ;
  this.detail=false;
  this.description="";
  this.profil=""
  this.manager=[]
}
supprofil(id){
this.adminservice.supprofil(id).subscribe(data =>{} , ()=>{console.log('error')},() =>{this.getallprofil() ;} ) ;
}

getdetailprofil(id){
this.idprofil=id ;
this.adminservice.getmanager().subscribe(data => {this.manager=data},()=> console.log('error') , ()=>{
this.adminservice.getdetailprofil(id).subscribe(data =>{this.profil=data["name"];this.description=data["description"]
for(let i of this.manager )
  {
    for(let j of data["owner"])
      {
        if(i.id==j){
          i.value=true ;
        }
      }
  }
} , ()=>{console.log('error')},() =>{this.page=2;this.detail=true} ) ;}   ) ;
}

modifier(id){
  this.adminservice.supprofil(this.idprofil).subscribe(data =>{} , ()=>{console.log('error')},() =>{this.postprofil()} ) ;
}


ngOnInit(){
this.getexam() ; 
this.getallprofil() ;
}

}