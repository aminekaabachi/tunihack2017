import { Injectable } from '@angular/core';
import { Question } from '../question'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AdminService {

ip="127.0.0.1"
constructor(private http:Http , private authenticationService: AuthenticationService) { }

postcree(exam,ques):Observable<any>{
    var params = JSON.stringify({examen:exam,question : ques }) ;
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/creation/',params,{headers:headers}).map(res => res.json());
}

getexam():Observable<any>{
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.get('http://'+this.ip+':8000/getexam/',{headers:headers}).map(res => res.json()) ;
}

postsupprim(id):Observable<any>{
    var params = JSON.stringify(id) ;
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/supprimer/',params,{headers:headers}).map(res => res.json());
}

getdonnee(id):Observable<any>{
    var params = JSON.stringify(id) ;
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/getdonnee/',params,{headers:headers}).map(res => res.json());
}

    getusr():Observable<any>{
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.get('http://'+this.ip+':8000/getusr/',{headers:headers}).map(res => res.json()) ;
}

postaffecter(idusr,idexam):Observable<any>{
    var params = JSON.stringify({idusr:idusr,idexam:idexam}) ;
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/affecter/',params,{headers:headers}).map(res => res.json());
}

postrelation():Observable<any>{
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.get('http://'+this.ip+':8000/getrelation/',{headers:headers}).map(res => res.json()) ;
}

postcommentaire(id,commentaire):Observable<any>{
    var params = JSON.stringify({id:id,commentaire:commentaire}) ;
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/commentaire/',params,{headers:headers}).map(res => res.json());
}

GetScore(id):Observable<any>{
    var params=JSON.stringify(id) ;
    var headers=new Headers() ;
    headers.append('Content-Type','application/json') ;
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/getscore/',params,{headers:headers}).map(res=> res.json()) ;
}
GetType(id):Observable<any>{
    var params=JSON.stringify(id) ;
    var headers=new Headers() ;
    headers.append('Content-Type','application/json') ;
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/gettype/',params,{headers:headers}).map(res=> res.json()) ;
}

getmanager():Observable<any>{
    var headers=new Headers() ;
    headers.append('Content-Type','application/json') ;
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.get('http://'+this.ip+':8000/manager/',{headers:headers}).map(res=> res.json()) ;
}

postprofil(profil,descriprion,owner):Observable<any>{
    var params=JSON.stringify({profil:profil,descriprion:descriprion,owner:owner}) ;
    var headers=new Headers() ;
    headers.append('Content-Type','application/json') ;
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/postprofil/',params,{headers:headers}).map(res=> res.json()) ;
}


getnotify(username):Observable<any>{
    var params=JSON.stringify(username) ;
    var headers=new Headers() ;
    headers.append('Content-Type','application/json') ;
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/getnotify/',params,{headers:headers}).map(res=> res.json()) ;

}
supnotify(username):Observable<any>{
    var params=JSON.stringify(username) ;
    var headers=new Headers() ;
    headers.append('Content-Type','application/json') ;
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/supnotify/',params,{headers:headers}).map(res=> res.json()) ;
}
ajoutadmin(id):Observable<any>{
    var params=JSON.stringify(id) ;
    var headers=new Headers() ;
    headers.append('Content-Type','application/json') ;
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/ajoutadmin/',params,{headers:headers}).map(res=> res.json()) ;
}

ajoutmanager(id):Observable<any>{
    var params=JSON.stringify(id) ;
    var headers=new Headers() ;
    headers.append('Content-Type','application/json') ;
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/ajoutmanager/',params,{headers:headers}).map(res=> res.json()) ;
}

retireradmin(id):Observable<any>{
    var params=JSON.stringify(id) ;
    var headers=new Headers() ;
    headers.append('Content-Type','application/json') ;
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/retireradmin/',params,{headers:headers}).map(res=> res.json()) ;
}

retirermanager(id):Observable<any>{
    var params=JSON.stringify(id) ;
    var headers=new Headers() ;
    headers.append('Content-Type','application/json') ;
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/retirermanager/',params,{headers:headers}).map(res=> res.json()) ;
}

getallprofil():Observable<any>{
    return this.http.get('http://'+this.ip+':8000/getallprofil/').map(res=> res.json()) ;
}

supprofil(id):Observable<any>{
    var params=JSON.stringify(id) ;
    var headers=new Headers() ;
    headers.append('Content-Type','application/json') ;
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/supprofil/',params,{headers:headers}).map(res=> res.json()) ;
}

getdetailprofil(id):Observable<any>{
    var params=JSON.stringify(id) ;
    var headers=new Headers() ;
    headers.append('Content-Type','application/json') ;
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/getdetailprofil/',params,{headers:headers}).map(res=> res.json()) ;
}
}
