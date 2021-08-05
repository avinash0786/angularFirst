import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly ROOT_URL;
  JWT_TOKEN:string="null";
  isLogged:boolean=false;
  constructor(private http: HttpClient) {
    console.log("Data service initalized")
    this.ROOT_URL='http://localhost:3000/secure'
    this.http.get(this.ROOT_URL+'/isAuth',{observe:'response',withCredentials: true})
      .subscribe({
        next: (data: any) => {
          console.log("data recieved authentication")
          console.log(data.body);
           if (data.body.isAuthenticated){
             this.isLogged=true;
           }
        },
        error: err => {
          console.log(err)
        }
      })
  }

  registerUser(body:object){
    return this.http.post(this.ROOT_URL+'/register',body,{observe:'response',withCredentials: true})
  }

  loginUser(body:object){
    return this.http.post(this.ROOT_URL+'/login',body,{observe:'response',withCredentials: true})
  }

  checkUserName(uid:string){
    return this.http.get(this.ROOT_URL+'/checkUserId/'+uid,{observe:'response',withCredentials: true})
  }

  loadProfile(){
    return this.http.get(this.ROOT_URL+'/profile',{observe:'response',withCredentials: true})
  }

  logoutUser(){
    return this.http.get(this.ROOT_URL+'/logout',{observe:'response',withCredentials: true})
  }

  checkCon(){
    return this.http
      .get(this.ROOT_URL+'/',{observe:'response' as 'body'});
  }
}
