import { Component , Input} from '@angular/core';
import {Question } from "../question" ; 
import {Examen } from "../examen" ; 
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { HttpModule }    from '@angular/http';
import {ManagerService} from  './manager.service' ;
import{CandidatService} from '../candidat/candidat.service'
import{AdminService} from '../admin/admin.service'



@Component({
  selector: 'my-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent  {
  title = 'admin';
  usrs:any[] ; 
  usr:any="" ; 
  examen:Examen[] ; 
  page1=true ;
  exam:Examen ;
  numopt:any=1 ;
  idexam=-1 ; 
  numques=-1; 
  idexamen:any ; 
  ques:any=[]  ; 
  examens:Examen[] ; 
  bareme=0 ; 
  note=0 ;
  aide:any="" ;
  constructor (public managerservice: ManagerService ,public candidatservice:CandidatService , public adminservice:AdminService){}


getdonnee(id1,id2){
  this.candidatservice.getdonnee(id1,id2).subscribe(data =>  this.remplirdonnee(data),  ()=>console.log('Error'),() =>{this.idexamen=id1} ) ; 
}

remplirdonnee(data) { 
  var juge ;  
  this.exam = new Examen(this.idexam,data["exam"]['titre'],data["exam"]['desc'],0) ;

  for( let i of data['ques'] )
  {
    juge=true ;
    var ques:Question ;
    var rep:any=1 ;  
  if (!i['juge'].length) 
  {
    ques = new Question(i['id'],i["type"],i['ques'],[],[],[],"",i['bareme']) ; 
    ques.note=i['note'] ;
  }
  else {
    ques= new Question(i['id'],i["type"],i['ques'],[],[],[],"",i['bareme'],i['juge']) ; 
    
    for (let kj of i['juge']) {
      juge=juge && kj
    }
    if (juge) {
      ques.note=ques.bareme 
    }
    else {
      ques.note=0
    }
  }
    if ( i["type"]=='qcm') {
    if(i['reponse'].length==0){
        rep=0
      }  
      for (let j in i['optlabel']) 
    {
      if(rep==0){
      ques.correction.push(false)
      }
      else
        {
          ques.correction.push(i['reponse'][j])
        } 
      ques.opt.push(i['opt'][j]) ;
      ques.optlabel.push(i['optlabel'][j]) ; 
      this.numopt ++ ;  
    }
    
    }

  else {
     ques.correctiontype2=i['reponse'][0]
     ques.correction.push(i['correction'])

    } 
    
    this.numques ++ 
    this.ques.push(ques) ; 
    
  }
    this.note=0 ;
  this.bareme=0;
  for (let k of this.ques){
    this.note=this.note+k.note ;
    this.bareme=this.bareme+k.bareme
  }

}

correctionques(i){
  this.aide=i.correction[0]
}




getexamusr(id){
  this.theusr(id) ;
  this.managerservice.getexam(id).subscribe(data =>this.examen=data , ()=>console.log('Error'),() =>{this.page1=false ;this.usr=id} ) ;

}

suppexamusr(){
  
  this.managerservice.postsuppexamusr(this.idexamen,this.usr).subscribe(data =>{}, ()=>console.log('Error'),() =>{this.getexamusr(this.usr)} ) ;
}

theexam(id){
  this.idexamen=id ; 

}

getusrs(){
  this.managerservice.getusrs().subscribe(data =>this.usrs=data , ()=>console.log('Error'),() =>{} ) ;
}

theusr(i){
this.usr=i ;
}

detail(id1)
{
  this.getdonnee(id1,this.usr) ;
}


fermerexamen(){

    this.ques.splice(0)  ;
    this.note=0 ; 
    this.bareme=0 ;


}
  getexam(){
   
  this.adminservice.getexam().subscribe(data =>this.examens=data , ()=>console.log('Error'),() =>{ } ) 
  
}

page0(){
   this.page1=true ;
}

autocorrection(id1){
  this.managerservice.postautocorrection(id1,this.usr).subscribe(data =>{} , ()=>console.log('Error'),() =>{this.getdonnee(id1,this.usr)} ) ;
}

calculernote() 
{
  
  this.note=0 ;
  this.bareme=0;
  for (let k of this.ques){
    this.note=this.note+k.note ;
    this.bareme=this.bareme+k.bareme
  }
   this.managerservice.postnote(this.idexamen,this.usr,this.ques,this.note/this.bareme).subscribe(data =>{} , ()=>console.log('Error'),() =>{} ) ;

}

supprepusr(){
   this.managerservice.postsupprepusr(this.usr.id).subscribe(data =>{} , ()=>console.log('Error'),() =>{this.getusrs()} ) ;
}




ngOnInit(){

this.getusrs() ;
this.getexam() ;

}


}