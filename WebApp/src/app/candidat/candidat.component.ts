import { Component , Input,HostListener} from '@angular/core';
import {Question } from "../question" ; 
import {Examen } from "../examen" ; 
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { HttpModule }    from '@angular/http';
import {CandidatService} from  './candidat.service' ;



@Component({
  selector: 'my-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent  {
  title = 'candidat';
  examen:Examen[] ; 
  id:any=JSON.parse(localStorage.getItem('currentUser')).id ;  
  idexam=-1 ; 
  exam:Examen ; 
  numques=-1; 
  numopt:any=1 ;
  ques:any=[]  ;
  idexamen:any ; 
  name:string;
  started = false;
  time : any ; 
  ind:any=1 ; 
  constructor (public candidatservice: CandidatService){}


  private _timerTick() {
    if (this.started) {
      this.time.setSeconds(this.time.getSeconds(), -1);
      
      if (this.time.getHours() === 0 && this.time.getMinutes() === 0 && this.time.getSeconds() === 0) {
        this.envoyer()
        this.started = false;
      }
    }
    setTimeout(() => this._timerTick(), 1000);
  }
  

  
  start() {
    this.started = true;
  }
  
  stop() {
    this.started = false; 
  }



getexam(id){
  this.candidatservice.getexam(id).subscribe(data =>this.examen=data , ()=>console.log('Error'),() =>{} ) 
}

getdonnee(id1,id2){
  this.candidatservice.getdonnee(id1,id2).subscribe(data =>  this.remplirdonnee(data),  ()=>console.log('Error'),() =>{this.idexamen=id1} ) ; 
}

remplirdonnee(data) { 
  this.exam = new Examen(this.idexam,data["exam"]['titre'],data["exam"]['desc'],0) ;

  for( let i of data['ques'] )
  {
    var ques:Question ;
    var rep:any=1 ;  
    ques = new Question(i['id'],i["type"],i['ques'],[],[],[],"",1) ; 
    
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
    } 
    
    this.numques ++ 
    this.ques.push(ques) ; 
    
  }
  
  this.time=new Date(0, 0, 0, 0, 0, data["exam"]["duree_restant"]);
  if(this.time.getHours()||this.time.getSeconds()||this.time.getMinutes())
    {
  this.start()
    }
}

envoyer(){
    this.candidatservice.postverou(this.id,this.idexamen).subscribe(data =>  { },  ()=>console.log('Error'),() =>{
    this.candidatservice.postenvoyer(this.id,this.idexamen,this.ques,this.time.getSeconds()+this.time.getMinutes()*60+this.time.getHours()*3600).subscribe(data =>  {},  ()=>console.log('Error'),() =>{this.ques.splice(0); this.getexam(this.id)} ) ; } ) ;  
}

fermerexamen(){
    
    this.stop() ; 
    this.candidatservice.postenvoyer(this.id,this.idexamen,this.ques,this.time.getSeconds()+this.time.getMinutes()*60+this.time.getHours()*3600).subscribe(data =>  {},  ()=>console.log('Error'),() =>{} ) ; 
    this.ques.splice(0)  ;
}

 
test(i){
  console.log(this.ques[i].correction)
}


ngOnInit(){
this.getexam(this.id) ;
this._timerTick() ;
}

@HostListener('window:beforeunload')
  doSomething() {
    if (this.idexamen) 
      {
    this.candidatservice.postenvoyer(this.id,this.idexamen,this.ques,this.time.getSeconds()+this.time.getMinutes()*60+this.time.getHours()*3600).subscribe(data =>  {},  ()=>console.log('Error'),() =>{this.ques.splice(0); this.getexam(this.id)} ) ; 
      }
  }

}