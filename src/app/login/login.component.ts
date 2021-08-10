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
        next:(data:any)=>{
          console.log("data recieved REGISTER")
          console.log(data)
          //storing the jwt token
          console.log(data.body.jwt)
          this.dataService.JWT_TOKEN=data.body.jwt;
          this.logProcessMessage="User Logged in, Redirect profile :-)";
          //setting the auth key in local storage

          localStorage.setItem('auth',JSON.stringify(data.body.jwt))
          this.dataService.userStatus.emit(true);
          this.router.navigate(['/profile'])
        },
        error:err => {
          this.logProcessMessage='Error Logging user !'
          console.log('error occured in Logging in User')
          console.log(err)
          if (err.status===401 || err.status===404)
            this.logProcessMessage='Authentication failed, try again !'
        }
      })
  }

}
