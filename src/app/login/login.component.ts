import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService:DataService,private router:Router) {
    console.log("Auth :"+this.dataService.isLogged)
    if (this.dataService.isLogged){
      this.router.navigate(['/profile'])
    }
  }

  ngOnInit(): void {
  }
  showMessage:boolean=false;
  logProcessMessage:string='Checking Username'

  userName:string="";
  password:string="";

  loignUser(){
    this.showMessage=true;
    this.logProcessMessage="Logging User"
    console.log('Login user ng called')

    this.dataService.loginUser({
      userName:this.userName,
      pswd:this.password
    })
      .subscribe({
        next:data=>{
          console.log("data recieved REGISTER")
          console.log(data)
          //storing the jwt token
          // @ts-ignore
          console.log(data.body.jwt)
          // @ts-ignore
          this.dataService.JWT_TOKEN=data.body.jwt;
          this.logProcessMessage="User Logged in, Redirect profile :-)";
          this.router.navigate(['/profile'])
          this.dataService.isLogged=true;
        },
        error:err => {
          console.log(err)
          this.logProcessMessage='Error Logging user !'
          console.log('error occured in Logging in User')
        }
      })
  }

}
