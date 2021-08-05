import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ProfileDataService} from "../services/profile-data.service";
import {DataService} from "../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  // selector: '[app-profile]',   attribute selector
  // selector: '.app-profile',  class selector
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[]
})
export class ProfileComponent implements OnInit,OnChanges {
  constructor(private dataService:DataService, private profileService:ProfileDataService,private router:Router) {
    this.profileService.dataChange.subscribe((info:string)=>{
      alert('SUBS: dataChange: '+info)
    })

    if (this.dataService.isLogged){
      //if not logged then rediret to login
      // this.router.navigate(['/login'])
    }
    else {
      //get profile data
      this.dataService.loadProfile()
        .subscribe({
          next: (data: any) => {
            console.log("data recieved Profile")
            console.log(data.body);
            this.firstName = data.body.fname;
            this.lastName = data.body.lname;
            this.email = data.body.email;
            this.userName = data.body.userName;
            this.showMessage=false;
          },
          error: err => {
            console.log(err)
            console.log('error occured in Profile User')
          }
        })
    }
  }

  ngOnInit(): void {
  }
  //---------Code for assignments------------------
  showMessage:boolean=true;
  editProfile:boolean=false;
  processingUsername:boolean=false;
  userNameOK:boolean=true;
  disbleRegister:boolean=!this.userNameOK && !this.processingUsername;

  firstName:string="";
  lastName:string="";
  userName:string="";
  password:string="";
  email:string="";
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

