import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  //here we are emitting the selected bar to display, which will be handled by the app component
  @Output() barSelected=new EventEmitter<string>();

  selectBar(feature:string){
    this.barSelected.emit(feature);
  }

}
