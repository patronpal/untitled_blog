import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyFirstPipePipe } from './myPipes/my-first-pipe.pipe';
import {FormsModule} from "@angular/forms";
import { FilterPipe } from './myPipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MyFirstPipePipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
