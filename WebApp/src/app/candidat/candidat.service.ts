import { Injectable } from '@angular/core';
import { Question } from '../question'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class CandidatService {
ip="127.0.0.1"
constructor(private http:Http  , private authenticationService: AuthenticationService) { }



getexam(id):Observable<any>{
    var params = JSON.stringify(id) ; 
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/getexamen/',params,{headers:headers}).map(res => res.json()); 
}

getdonnee(id1,id2):Observable<any>{
    var params = JSON.stringify({idexamen:id1,idusr:id2}) ; 
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/getdonnee2/',params,{headers:headers}).map(res => res.json()); 
}

postenvoyer(idusr,idexamen,ques,duree):Observable<any>{
    var params = JSON.stringify({idusr:idusr,idexamen:idexamen,ques:ques,duree:duree}) ; 
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/envoyer/',params,{headers:headers}).map(res => res.json()); 
}

postverou(idusr,idexamen):Observable<any>{
    var params = JSON.stringify({idusr:idusr,idexamen:idexamen}) ; 
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/verou/',params,{headers:headers}).map(res => res.json()); 

}

}