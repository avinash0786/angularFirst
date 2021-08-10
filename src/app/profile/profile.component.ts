import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ProfileDataService} from "../services/profile-data.service";
import {DataService} from "../services/data.service";
import {Router} from "@angular/router";
import {CanComponentDeactivate} from "./can-leave.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  // selector: '[app-profile]',   attribute selector
  // selector: '.app-profile',  class selector
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[]
})
export class ProfileComponent implements OnInit,OnChanges,CanComponentDeactivate {
  constructor(private dataService:DataService, private profileService:ProfileDataService,private router:Router) {
    console.log("Profile comp:  "+this.router.url)

    this.profileService.dataChange.subscribe((info:string)=>{
      alert('SUBS: dataChange: '+info)
    })
    //get profile data
    this.dataService.loadProfile()
      .subscribe({
        next: (data: any) => {
          console.log("data recieved Profile")
          if (data.body.status==404){
            router.navigate(['/login'])
            return;
          }
          console.log(data.body);
          this.firstName = data.body.fname;
          this.lastName = data.body.lname;
          this.email = data.body.email;
          this.userName = data.body.userName;
          this.showMessage=false;
        },
        error: err => {
          console.log(err)
          console.log('error occured in Profile User');
          localStorage.clear();
          router.navigate(['/login'])
        }
      })
  }

  ngOnInit(): void {
  }
  //---------Code for assignments------------------
  showMessage:boolean=true;
  editProfile:boolean=false;
  dataSaved:boolean=false;
  disableUpdate:boolean=false;
  logProcessMessage:string="Update Profile Details"

  firstName:string="";
  lastName:string="";
  userName:string="";
  password:string="";
  email:string="";

  saveProfileData(){
    this.disableUpdate=true;
    this.showMessage=true;
    this.logProcessMessage="Updating Profile, wait ⌚";
    console.log("Updating user data");
    if (this.password===""){
      this.logProcessMessage="Password blank 😠";
      this.disableUpdate=false;
      return;
    }
    console.log("Updating user start")
    this.dataService.updateUser({
      fname:this.firstName,
      lname:this.lastName,
      userName:this.userName,
      email:this.email,
      pswd:this.password
    })
      .subscribe({
        next:(data:any)=>{
          console.log("data recieved REGISTER")
          console.log(data)
          this.logProcessMessage="Profile Updated 😄";
          this.disableUpdate=false;
          this.dataSaved=true;
          localStorage.setItem('auth',JSON.stringify(data.body.jwt))
          setTimeout(()=>{
            this.showMessage=false;
          },2000)
        },
        error:err => {
          console.log(err)
          this.logProcessMessage='Error Updating user 😔'
          console.log('error occured in Regsitering User')
        }
      })
  }

  checkUserAvl(event:any){
    this.showMessage=true;
    this.logProcessMessage="Checking UserName";
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
            this.disableUpdate=false;
            console.log('User available for use')
            this.logProcessMessage="UserName Available 😄";
          }
          else {
            this.disableUpdate=true;
            console.log('User NOT available for use')
            this.logProcessMessage="UserName NOT Available 😔";
          }
        },
        error:err => {
          console.log(err)
          this.logProcessMessage='Error Checking user !'
          console.log('error occured in checking User')
        }
      })
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.editProfile && !this.dataSaved )
      return confirm("Do you want to discard changes?");
    else {
      return true;
    }
  }
  //---------Code for assignments------------------


  ngOnChanges(changes:SimpleChanges){
    console.log(changes)
  }
  @Input()
  profValfromRoot!:string;

  userName1:string="Avinash Kumar";
  city:string="Chandigarh";
  country="India,[IN]";
  buttonMessage="";
  saveData(){
    this.buttonMessage="Your data is saved successfully"
  }
  deleteData(){
    this.buttonMessage="Your data is Deleted successfully";
    this.country="";
    this.city="";
  }
  getCompleteAddress(){
    return `${this.userName} lives in ${this.city}, ${this.country}`
  }
  onCityChange(event:any){
    console.log(event);
    this.city=event.target.value;
  }
  changeRootVal(){
    this.profValfromRoot="Changed value"
  }

  showProfiles(){
    console.log(this.profileService.profiles)
  }
  changeName(index:number){
    this.profileService.profiles[index].name="Changed";
    console.log(this.profileService.profiles)
  }


}

/*
7 july: 10k
7 Aug:  25k  [15k: Puja, 10k rest]
7 sept: 25k
7 oct:  25k
7 nov:  25k
*/

