import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
 
@Component({
    selector: 'login',
    templateUrl: 'login.component.html' ,
    styleUrls: ['./login.component.css']
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    
    loading = false;
    status : any ; 
    error = '';
    error2='' ; 
    id:any ;
    insc:boolean=true ; 
    profils:any=[] ; 
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {
            this.model.sexe="" ;
            this.model.profil="" ;
        }
 
    ngOnInit() {
        this.authenticationService.logout();
        this.getallprofil() ;
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {if (result === true) { this.stat(JSON.parse(localStorage.getItem('currentUser')).token ,JSON.parse(localStorage.getItem('currentUser')).username )   }} , ()=> {
                  this.error = 'Username or password is incorrect';
                    this.loading = false;
                } , 
                ()=>{}
                
            );
    }



stat(token,username){
  this.authenticationService.getstatus(token).subscribe(data =>{this.status=data["status"] ; this.id=data["id"]} , ()=>console.log('Error'),() =>{this.redirect()} ) ; 
}



redirect()
{
    localStorage.setItem('currentUser', JSON.stringify( {username:JSON.parse(localStorage.getItem('currentUser')).username,token :JSON.parse(localStorage.getItem('currentUser')).token,  status:this.status,id:this.id} ))
    if ( JSON.parse(localStorage.getItem('currentUser')).status=="6f2542120273928a64911d1d285ae6f75fe58cfa35c91dd18ab2b55216b2ecb1"){
                this.router.navigate(['/admin']);
                }
                else 
                    {
                         if ( JSON.parse(localStorage.getItem('currentUser')).status=="6ee4a469cd4e91053847f5d3fcb61dbcc91e8f0ef10be7748da4c4a1ba382d17"){
                        this.router.navigate(['/manager']);
                        }
                    else {
                        this.router.navigate(['/candidat']);
                    }
                        
                    }
}

inscription(){
    this.authenticationService.inscription(this.model.username1,this.model.nom,this.model.penom,this.model.password1,this.model.sexe,this.model.profil).subscribe(data =>{} , ()=>{this.error2="Username est deja utilisé essaie avec nom_penom ou nom-penom" },() =>{this.insc=false} ) ; 

}

getallprofil(){
    this.authenticationService.getallprofil().subscribe(data =>{this.profils=data} , ()=>{console.log('error')},() =>{} ) ; 
}


}