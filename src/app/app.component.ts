import {Component, SimpleChanges} from '@angular/core';
import {DataService} from "./services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dataService:DataService,private router:Router) {
    console.log("App Component:  constructor called")
  }

  ngOnInit(){
    console.log("App Component:  NG-ON-init called")
    console.log("User auth key: "+localStorage.getItem('auth'))

    if (localStorage.getItem('auth')) {
      this.dataService.isLogged = true;
      this.router.navigate(['/profile'])
    }
    else {
      this.dataService.isLogged = false;
      this.router.navigate(['/login'])
    }
  }

  //---------Code for assignments------------------




  //---------Code for assignments------------------

  yourName = 'Avinash Kumar';
  title="";
  rootValue="My ROOT value from app component";

  serverElements=[
    {
      type:'server',
      name:'My test server',
      content:'This is my description'
    },
    {
      type:'blueprint',
      name:'My production server',
      content:'This is my production server'
    }
  ];
  changeRootVal(){
    this.rootValue="Changed value"
  }

  selectedTab:string='';
  onNavigate(feature:string){
    console.log(feature);
    this.selectedTab=feature;
  }

}
