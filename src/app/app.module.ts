import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ImplDirectiveComponent } from './impl-directive/impl-directive.component';
import { ServerElemenComponent } from './server-elemen/server-elemen.component';
import { NavbarComponent } from './navbar/navbar.component'

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ImplDirectiveComponent,
    ServerElemenComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
