import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {NgconceptComponent} from "./ngconcept/ngconcept.component";
import {AuthGuard} from "./services/auth-guard.service";
import {CanDeactivateGuard} from "./profile/can-leave.service";
import {LearnformsComponent} from "./learnforms/learnforms.component";

const appRoutes:Routes=[
  {path:'register', component:RegistrationComponent},
  {path:'login', component:LoginComponent},
  {path:'profile', canActivate:[AuthGuard],canDeactivate:[CanDeactivateGuard] ,component:ProfileComponent},
  {path:'concept',component:NgconceptComponent},
  {path:'forms',component:LearnformsComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
