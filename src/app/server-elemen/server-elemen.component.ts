import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ProfileDataService} from "../services/profile-data.service";

@Component({
  selector: 'app-server-elemen',
  templateUrl: './server-elemen.component.html',
  styleUrls: ['./server-elemen.component.css'],
  providers:[]

})
export class ServerElemenComponent implements OnInit {
  @Input()
  element!: { type: string; name: string; content: string; };

  constructor(private profileService:ProfileDataService) { }

  ngOnInit(): void {
  }
  showProfiles(){
    console.log(this.profileService.profiles)
  }
  changeName(index:number){
    this.profileService.profiles[index].name="Changed";
    console.log(this.profileService.profiles)
    this.profileService.dataChange.emit('Name is changed: EMIT')
  }
}
