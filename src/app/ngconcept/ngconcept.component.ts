import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {share} from "rxjs/operators";

@Component({
  selector: 'app-ngconcept',
  templateUrl: './ngconcept.component.html',
  styleUrls: ['./ngconcept.component.css']
})
export class NgconceptComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("Ng concept component loaded")

    const customObs=new Observable(observer=>{
      let count=0;
      setInterval(()=>{ //dont use setInterval
        observer.next(count)
        count++;
        if (count>10)
          observer.complete();
        // observer.error();
      },1000)
    });

    // const arr = [1, 2, 3, 4, 5, 5, 6];
    // const obj = {
    //   name: 'Subrat',
    //   from: 'Bangalore'
    // };
    // let stringArray = ['hi', 'i', 'am', 'Biku'];
    //
    // let obs = of(23, arr, obj, 'Subart', stringArray, {});
    //
    // obs.subscribe(
    //   data => console.log(data)
    // )
    //
    // setTimeout(() => {
    //   obs.subscribe(
    //     data => console.log(data)
    //   )
    // }, 1000)

    //cannot use set Interval because it will run infinitely and it is difficult to stop it

    // customObs.subscribe({
    //   next:val=>{
    //     console.log("Value is: "+val);
    //   },
    //   error:er=>{
    //     console.log(er);
    //   },
    //   complete:()=>{
    //     console.log("Completed observable iter")
    //   }
    // })

  //there are 2 ways to  multicast, we can make our own and use the rxJS package to multicast observable

    const SequenceOld = new Observable(this.multiCastSubscriber());
    const SequenceMulti = new Observable(this.multipleSubscriber());
    const Sequence = SequenceOld.pipe(share());

    // Subscribe starts the clock, and begins to emit after 1 second

    Sequence.subscribe({
      next(num) { console.log('1st subscribe: ' + num); },
      complete() { console.log('1st finished.'); }
    });

    // After 1 1/2 seconds, subscribe again (should "miss" the first value).
    setTimeout(() => {
      Sequence.subscribe({
        next(num) { console.log('2nd subscribe: ' + num); },
        complete() { console.log('2nd finished.'); }
      });
    }, 3000);

  }
  //here we will implement custom observables, multicasting observable
  //there is a observer variable in the constructor of the new Observable , so we use that variable
  multipleSubscriber() {
    const arr = [1, 2, 3, 4, 5, 6];
    return (observer:any) => {
      this.run(observer, arr, 0);
      return {
        unsubscribe() {
        }
      };
    }
  }
  //this run method return a setTimeout which do the wrk of recursively running the obs
  run(observer:any, arr:any, index:number) {
    return setTimeout(() => {
      observer.next(arr[index]);    //emitting the value

      if (index === arr.length - 1) {
        observer.complete();
      }
      else {
        //recursively calling for next value
        this.run(observer, arr, ++index);
      }
    }, 1000);
  }

  multiCastSubscriber() {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const observers:any[] = [];
    let timeoutId:any;

    return (observer:any) => {
      observers.push(observer);
      // When this is the first subscription, start
      if (observers.length === 1) {
        timeoutId = this.run({
          next(val: any) {
            // Iterate through observers and notify all subscriptions
            observers.forEach(obs => obs.next(val));
          },
          complete() {
            // Notify all complete callbacks
            observers.slice(0).forEach(obs => obs.complete());
          }
        }, arr, 0);
      }

      return {
        unsubscribe() {
          observers.splice(observers.indexOf(observer), 1);
          // If there's no more listeners, do cleanup
          if (observers.length === 0) {
            clearTimeout(timeoutId);
          }
        }
      };

    };
  }

}
