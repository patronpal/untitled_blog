import { Component } from '@angular/core';
import {AppCounter1Service} from "../Services1/appCounter1.service";
import {AppLocalCounterService} from "../Services1/app-local-counter.service";


@Component({
  selector: 'app-for-test-service',
  templateUrl: './for-test-service.component.html',
  styleUrls: ['./for-test-service.component.scss'],
  providers: [AppLocalCounterService]
})
export class ForTestServiceComponent  {

  constructor(
    public appCounter1Service: AppCounter1Service,
    public appLocalServise: AppLocalCounterService
  ) {
  }

}
