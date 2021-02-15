import { Injectable } from '@angular/core';

@Injectable()
export class AppLocalCounterService {

  counter1 = 0

  counterUp(){
    this.counter1++
  }

  counterDown(){
    this.counter1--
  }

}
