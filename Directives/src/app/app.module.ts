import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {StyleDirective} from "./directives/style.directive";
import { IfNotDeleteDirective } from './directives/if-not-delete.directive';

@NgModule({
  declarations: [
    AppComponent,
    StyleDirective,
    IfNotDeleteDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
