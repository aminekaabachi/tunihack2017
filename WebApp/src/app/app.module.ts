import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms' ;
import { HttpModule }    from '@angular/http';
import { RouterModule }   from '@angular/router';
import {AdminService} from  './admin/admin.service' ;
import { AppComponent } from './app.component';
import {AdminComponent} from "./admin/admin.component" ;
import {HeaderComponent} from "./header.component" ;
import {MenuComponent} from "./menu.component" ;
import { SearchPipe } from './search.pipe';
import {CandidatComponent} from "./candidat/candidat.component" ;
import {CandidatService} from  './candidat/candidat.service' ;
import {ManagerComponent} from "./manager/manager.component" ;
import {ManagerService} from  './manager/manager.service' ;
import { AuthGuard } from './auth.guard';
import { AuthGuardcandidat } from './auth.guard';
import { AuthGuardmanager } from './auth.guard';
import { AuthenticationService } from './authentication/authentication.service';
import{AdminProfilComponent} from "./admin/adminprofil.component" ;
import{CrimeComponent} from "./crime/crime.component" ;
import{AjoutCrimeComponent} from "./ajoutcrime/ajoutcrime.component" ;
import { AgmCoreModule } from '@agm/core';
import { AnalyseComponent } from './analyse/analyse.component';
import { LoginComponent } from './authentication/login.component';
import { routing }        from './app.routing';
import { NvD3Module } from 'ng2-nvd3';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { PredictionComponent } from './prediction/prediction.component';

@NgModule({
  declarations: [
    AppComponent ,
    AdminComponent ,
    HeaderComponent ,
    MenuComponent ,
    SearchPipe,
    CandidatComponent,
    ManagerComponent ,
    LoginComponent , 
    AdminProfilComponent , 
    CrimeComponent ,
    AjoutCrimeComponent ,
    AnalyseComponent , 
    PredictionComponent , 

  ],
  imports: [
    BrowserModule ,
    FormsModule , 
    HttpModule,  
    routing,
    NvD3Module ,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAR7L-0ByNiA9in9SHO_1cdaWBJYeFRo0'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [AdminService,CandidatService,ManagerService, AuthenticationService,AuthGuard , AuthGuardcandidat,AuthGuardmanager],
  bootstrap: [AppComponent]
})
export class AppModule { }
