import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ImplDirectiveComponent } from './impl-directive/impl-directive.component';
import { ServerElemenComponent } from './server-elemen/server-elemen.component';
import { NavbarComponent } from './navbar/navbar.component'
import {HighlightDirective} from "./directives/highlight.directive";
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

const appRoutes:Routes=[
  {path:'register', component:RegistrationComponent},
  {path:'login', component:LoginComponent},
  {path:'profile', component:ProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ImplDirectiveComponent,
    ServerElemenComponent,
    NavbarComponent,
    HighlightDirective,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
