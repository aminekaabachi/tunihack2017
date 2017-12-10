import { Injectable } from '@angular/core';
import { Router, CanActivate ,CanActivateChild } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        if (localStorage.getItem('currentUser')) {
           if ( JSON.parse(localStorage.getItem('currentUser')).status=="6f2542120273928a64911d1d285ae6f75fe58cfa35c91dd18ab2b55216b2ecb1")
            {
            return true;
            }
            else {
                 this.router.navigate(['/manager']);
                 return true;
            }
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}

@Injectable()
export class AuthGuardcandidat implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        if (localStorage.getItem('currentUser')) {
           if ( JSON.parse(localStorage.getItem('currentUser')).status=="19cb59813ccdd60d3713be953ebdfafc668993d26634c397c7ec8bb0e16572c3")
            {
            return true;
            }
   
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}


@Injectable()
export class AuthGuardmanager implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        if (localStorage.getItem('currentUser')) {
           if ( JSON.parse(localStorage.getItem('currentUser')).status=="6ee4a469cd4e91053847f5d3fcb61dbcc91e8f0ef10be7748da4c4a1ba382d17" || JSON.parse(localStorage.getItem('currentUser')).status=="6f2542120273928a64911d1d285ae6f75fe58cfa35c91dd18ab2b55216b2ecb1")
            {
            return true;
            }
            else {
                 this.router.navigate(['/candidat']);
                 return true;
            }
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}



