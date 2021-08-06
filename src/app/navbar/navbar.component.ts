import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from "../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private dataService:DataService,private router:Router) {
    this.dataService.userStatus.subscribe(
      (status:boolean)=>{
        this.userLogged=status;
      }
    )
  }

  ngOnInit(): void {
    this.userLogged=this.dataService.isLogged;
  }
  //---------Code for assignments------------------
  userLogged:boolean=false;


  //---------Code for assignments------------------

  //here we are emitting the selected bar to display, which will be handled by the app component
  @Output() barSelected=new EventEmitter<string>();

  selectBar(feature:string){
    this.barSelected.emit(feature);
  }


  logoutUser(){
    console.log("Logging OUT user")
    this.dataService.logoutUser()
      .subscribe({
        next:data=>{
          console.log("Logged out user")
          console.log(data)
          this.router.navigate(['/login'])
          localStorage.clear(); //deleting the user in local storage
          this.userLogged=false;
          this.dataService.isLogged=false;
          this.dataService.userStatus.emit(false);
        },
        error:err => {
          console.log(err)
        }
      })
  }
}
