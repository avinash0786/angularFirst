import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ProfileDataService} from "../services/profile-data.service";

@Component({
  selector: 'app-profile',
  // selector: '[app-profile]',   attribute selector
  // selector: '.app-profile',  class selector
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[]
})
export class ProfileComponent implements OnInit,OnChanges {

  constructor(private profileService:ProfileDataService) {
    this.profileService.dataChange.subscribe((info:string)=>{
      alert('SUBS: dataChange: '+info)
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes:SimpleChanges){
    console.log(changes)
  }
  @Input()
  profValfromRoot!:string;

  userName:string="Avinash Kumar";
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
