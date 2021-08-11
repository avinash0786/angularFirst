import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSliderModule} from "@angular/material/slider";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ImplDirectiveComponent } from './impl-directive/impl-directive.component';
import { ServerElemenComponent } from './server-elemen/server-elemen.component';
import { NavbarComponent } from './navbar/navbar.component'
import {HighlightDirective} from "./directives/highlight.directive";
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NgconceptComponent } from './ngconcept/ngconcept.component';
import {AuthGuard} from "./services/auth-guard.service";
import {CanDeactivateGuard} from "./profile/can-leave.service";
import {AuthInceptorService} from "./services/auth-inceptor.service";
import { LearnformsComponent } from './learnforms/learnforms.component';


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
    NgconceptComponent,
    LearnformsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    CanDeactivateGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
