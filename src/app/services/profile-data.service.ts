import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {

  constructor() { }

  profiles=[
    {
      name:'avinash',
      section:'K18TM',
      age:18
    },
    {
      name:'deepak',
      section:'K18GH',
      age:19
    }
    ,{
      name:'Sumit',
      section:'K18GW',
      age:23
    }
  ];

  dataChange=new EventEmitter<string>();
}
