import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class EmailLogService{
  constructor() {
    console.log('Email log Service started');
  }
  private allEmails:{to:string,message:string}[]=[];

  sendEmail(sendTo:string,body:string){
    this.allEmails.push({
      to:sendTo,
      message:body
    })
    console.log(this.allEmails);
  }

  showAllMails(){console.log(this.allEmails)}

}
