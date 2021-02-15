import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {AppCounter1Service} from "./Services1/appCounter1.service";
import { ForTestServiceComponent } from './for-test-service/for-test-service.component';

@NgModule({
  declarations: [
    AppComponent,
    ForTestServiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    //AppCounter1Service //если в сервисе указан декаратор @Injectable
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
