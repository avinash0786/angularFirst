import {Component, ElementRef, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {EmailLogService} from "../services/email-log.service";

@Component({
  selector: 'app-impl-directive',
  templateUrl: './impl-directive.component.html',
  styleUrls: ['./impl-directive.component.css'],
  providers:[EmailLogService]
})
export class ImplDirectiveComponent implements OnInit {

  constructor(private emailLog:EmailLogService) { }

  ngOnInit(): void {
  }

  @ViewChild('sampleVal') sampleValue!:ElementRef;

  changeVal(){
    this.sampleValue.nativeElement.innerText="This is changed value"
  }

  status=true;
  disableStatus(){
    this.status=false;
  }
  servers=['Test-Server','Production-Server','Local-Server','Database-Server'];
  enableStatus(){this.status=true}
  getColor(){
    return this.status?'Green':'Red'
  }
  saveServerName(name:any){
    alert("Your serverName is : "+(name || "Not-Provided"))
  }

  saveEmailLog(){

  }
  logAllEmails(){

  }
}
