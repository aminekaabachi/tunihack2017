import { Routes, RouterModule } from '@angular/router';
 
import { LoginComponent } from './authentication/login.component';
import {AdminComponent} from "./admin/admin.component" ;
import {HeaderComponent} from "./header.component" ;
import {CandidatComponent} from "./candidat/candidat.component" ;
import {ManagerComponent} from "./manager/manager.component" ;
import{AdminProfilComponent} from "./admin/adminprofil.component" ;
import { AuthGuard } from './auth.guard';
import { AuthGuardcandidat } from './auth.guard';
import { AuthGuardmanager } from './auth.guard';
import { CrimeComponent } from './crime/crime.component';
import { PredictionComponent } from './prediction/prediction.component';
import { AnalyseComponent } from './analyse/analyse.component';
import{AjoutCrimeComponent} from "./ajoutcrime/ajoutcrime.component" ;


const appRoutes: Routes = [

    { path: '', component: AdminComponent },
   {path: 'crime',component: CrimeComponent} , 
    {path: 'analyse/:year',component: AnalyseComponent} ,
    {path: 'prediction', component: PredictionComponent} ,
    {path: 'ajoutcrime',component: AjoutCrimeComponent} ,
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);