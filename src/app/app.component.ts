import {Component, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit(){
    console.log("App Component:  NG-ON-init called")
  }

  constructor() {
    console.log("App Component:  constructor called")
  }
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
