import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private dataService:DataService,private router:Router) {
    if (this.dataService.isLogged){
      //if not logged then rediret to login
      this.router.navigate(['/profile'])
    }
  }

  ngOnInit(): void {
  }
  disableRegister:boolean=false;
  showMessage:boolean=false;
  regProcessMessage:string='Checking Username'
  out:any='Default';

  check(){
    this.dataService.checkCon()
      .subscribe(data=>{
        console.log(data);
        this.out=data;
        console.log(this.out.success)
        this.out=this.out.response
      })
  }
  fname:string="";
  lname:string="";
  userName:string="";
  email:string="";
  password:string="";

  registerUser(){
    this.showMessage=true;
    this.disableRegister=true;
    this.regProcessMessage="Registering User"
    console.log('Register user ng called')
    this.dataService.registerUser({
      fname:this.fname,
      lname:this.lname,
      userName:this.userName,
      email:this.email,
      pswd:this.password
    })
      .subscribe({
        next:data=>{
          console.log("data recieved REGISTER")
          console.log(data)
          this.regProcessMessage="Registered Successfully, Redirect login :-)";
        },
        error:err => {
          console.log(err)
          this.regProcessMessage='Error Registering user !'
          console.log('error occured in Regsitering User')
        }
      })
  }

  checkUserAvl(event:any){
    this.showMessage=true;
    this.regProcessMessage="Checking UserName";
    console.log(event.target.value)
    if (event.target.value==""){
      this.showMessage=false;
      return;
    }
    this.dataService.checkUserName(event.target.value)
      .subscribe({
        next:data=>{
          console.log("data recieved CHECK user")
          console.log(data)
          // @ts-ignore
          if (data.body.availableUser){
            this.disableRegister=false;
            console.log('User available for use')
            this.regProcessMessage="UserName Available 😄";
          }
          else {
            this.disableRegister=true;
            console.log('User NOT available for use')
            this.regProcessMessage="UserName NOT Available 😔";
          }
        },
        error:err => {
          console.log(err)
          this.regProcessMessage='Error Checking user !'
          console.log('error occured in checking User')
        }
      })
  }
}
