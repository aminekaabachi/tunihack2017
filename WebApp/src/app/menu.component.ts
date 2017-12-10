import { Component , Input} from '@angular/core';
import {Examen } from "./examen" ; 
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AdminService} from  './admin/admin.service' ;



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  title = 'menu';
  usr:any[] ; 
  aff:any[] ; 
  relation:any=[] ; 
  affrelation:any=[] ; 
  dixinf:any=0 ;
  dixsup:any=19;
  lenghtusr:any=0 ;  
  condidat:any ;
  condidat_commentaire:any="" ; 
  condidat_nom:any="" ; 
  condidat_prenom:any="" ; 
  condidat_statut:any="" ;
  condidat_score:any=[] ;
  condidat_type:any="" ;
  status=JSON.parse(localStorage.getItem('currentUser')).status ;
 
  
  constructor (public adminservice: AdminService){}

  @Input() examens: Examen[];

getusr(){
  this.adminservice.getusr().subscribe(data =>{this.usr=data ;this.lenghtusr=this.usr.length}, ()=>console.log('Error'),() =>{}  ) 
}

getrelation(){
    this.adminservice.postrelation().subscribe(data =>this.relation=data, ()=>console.log('Error'),() =>{this.getusr()} ) 
}
ajoutadmin(){
  this.adminservice.ajoutadmin(this.condidat.id).subscribe(data =>{}, ()=>console.log('Error'),() =>{} ) 
}
ajoutmanager(){
  this.adminservice.ajoutmanager(this.condidat.id).subscribe(data =>{}, ()=>console.log('Error'),() =>{} ) 
}
retireradmin(){
  this.adminservice.retireradmin(this.condidat.id).subscribe(data =>{}, ()=>console.log('Error'),() =>{} ) 
}
retirermanager(){
  this.adminservice.retirermanager(this.condidat.id).subscribe(data =>{}, ()=>console.log('Error'),() =>{} ) 
}

precedent(){

  if (this.dixsup-this.dixinf<19)
    {
      this.dixsup=this.dixinf
      this.dixinf=this.dixinf-19 
    }
    else
      {
  if ( this.dixinf > 0 )
  {
    this.dixinf=this.dixinf-19 ;
    this.dixsup=this.dixsup-19 ; 
  }
    else 
  {
    this.dixinf=this.usr.length-(this.usr.length-19); 
    this.dixsup=this.usr.length ;
  }
      }

}


getcondidat(usr){
  this.condidat=usr ; 
  this.condidat_commentaire=usr.commentaire ; 
  this.condidat_nom=usr.nom ; 
  this.condidat_prenom=usr.prenom ; 
  this.condidat_statut=usr.Statut ; 
  this.adminservice.GetScore(this.condidat.id).subscribe(data => this.condidat_score=data , ()=>console.log("Error"),()=>{} )
  this.adminservice.GetType(this.condidat.id).subscribe(data => this.condidat_type=data , ()=>console.log("Error"),()=>{} )

}


envoi_comment()
 {
   this.adminservice.postcommentaire(this.condidat.id,this.condidat_commentaire).subscribe(data =>{this.condidat.commentaire=this.condidat_commentaire}, ()=>console.log('Error'),() =>{} ) 
 }

suivant(){
  if( this.dixsup < this.usr.length )
  {
    this.dixinf=this.dixinf+19 ;
    this.dixsup=this.dixsup+19 ; 
  }
  else 
  {
    this.dixinf=0; 
    this.dixsup= 19;
  }
  
}

affecter(x,y){
 this.adminservice.postaffecter(x,y).subscribe(()=>{}, ()=>console.log('Error'),() =>{} ) 
}

  ngOnInit () {
    this.getrelation() 
    
    
    
  }
}

