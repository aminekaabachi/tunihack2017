import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    public token: string;
    public status :any ; 
    ip="127.0.0.1"
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

getstatus(token):Observable<boolean>{
    var params = JSON.stringify(JSON.parse(localStorage.getItem('currentUser')).username) ; 
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization' , 'Token ' + token);
    return this.http.post('http://'+this.ip+':8000/getstatus/',params,{headers:headers}).map(res => res.json()); 
}


  
    login(username: string, password: string): Observable<boolean> {
        var headers =  new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('http://'+this.ip+':8000/api-token-auth/', JSON.stringify({ username: username, password: password }),{headers:headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
    
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token })) ; 
                   
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 
    
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    inscription(username: string,nom:string,prenom:string,password: string,sexe:string,profil:string): Observable<boolean>{
        var params = JSON.stringify({username:username,nom:nom,prenom:prenom,password:password,sexe:sexe,profil:profil}) ; 
    var headers =  new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://'+this.ip+':8000/inscription/',params,{headers:headers}).map(res => res.json());     
    }

    getallprofil():Observable<any>{ 
    return this.http.get('http://'+this.ip+':8000/getallprofil/').map(res=> res.json()) ; 
}
}   