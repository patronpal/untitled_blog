import { Component } from '@angular/core';
import {AppCounter1Service} from "./Services1/appCounter1.service";
import {AppLocalCounterService} from "./Services1/app-local-counter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppLocalCounterService]
})
export class AppComponent {
  title = 'Services';

  constructor(
    public appCounter1: AppCounter1Service,
    private appLocalCounter: AppLocalCounterService) {
  }

}
