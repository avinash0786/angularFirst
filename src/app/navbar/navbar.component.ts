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
    this.userLogged=this.dataService.isLogged;
  }

  ngOnInit(): void {

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
          this.userLogged=false;
          this.dataService.isLogged=false;
        },
        error:err => {
          console.log(err)
        }
      })
  }
}
