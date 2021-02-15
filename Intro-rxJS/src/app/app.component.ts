import { Component } from '@angular/core';
import {interval, Subscription, Observable, Subject} from 'rxjs'
import {filter, map} from "rxjs/operators";                      //1

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Intro-rxJS';

  sub: Subscription;

  someSbj$:Subject<number> = new Subject<number>();
  counter=0;

  constructor() {

    //1
    // const intervalStream$ = interval(1000)
    // this.sub = intervalStream$
    //   .pipe(
    //     filter(value => value %3===0),
    //     map((value) => `Number Stream ${value}`)
    //   )
    //   .subscribe((value)=>{console.log(value)})

    //2
    // const stream$ = new Observable(obs => {
    //   setTimeout(()=> {obs.next(2)},1000)
    //   setTimeout(()=> {obs.next(3)},2000)
    //   setTimeout(()=> {obs.next(4)},3000)
    // })
    //
    // this.sub = stream$
    //   .subscribe(value => {console.log(value)})

    this.sub = this.someSbj$.subscribe(value => {console.log('value', value)})

  }

  stopInterval() {
    this.sub.unsubscribe()
  }

  nextCount() {
    this.someSbj$.next(this.counter++)
  }

}
