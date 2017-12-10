import { Injectable } from '@angular/core';
import { Question } from '../question'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class ManagerService {

ip="127.0.0.1"
constructor(private http:Http , private authenticationService: AuthenticationService) { }

getusrs():Observable<any>{
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.get('http://'+this.ip+':8000/usrrepond/',{headers:headers}).map(res => res.json()) ; 
}

getexam(id):Observable<any>{
    var params = JSON.stringify(id) ; 
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/getexamusr/',params,{headers:headers}).map(res => res.json()); 
}

postautocorrection(id1,id2):Observable<any>{
    var params = JSON.stringify({idexam:id1,idusr:id2}) ; 
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/autocorrection/',params,{headers:headers}).map(res => res.json()); 
}

postnote(id1,id2,ques,note):Observable<any>{
    var params = JSON.stringify({idexam:id1,idusr:id2,ques:ques,note:note}) ; 
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/note/',params,{headers:headers}).map(res => res.json()); 
    
}

postsupprepusr(id):Observable<any>{
    var params = JSON.stringify(id) ; 
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/supprepusr/',params,{headers:headers}).map(res => res.json()); 
}
postsuppexamusr(id1,id2):Observable<any>{
    var params = JSON.stringify({idexam:id1,idusr:id2}) ; 
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + this.authenticationService.token);
    return this.http.post('http://'+this.ip+':8000/suppexamusr/',params,{headers:headers}).map(res => res.json()); 
}


}