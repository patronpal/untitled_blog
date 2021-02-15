import {NgModule} from "@angular/core";
import {PageNamePipe} from "./page-name.pipe";
import {ColorDirective} from "./color.directive";

@NgModule({
  declarations:[
    PageNamePipe,
    ColorDirective
  ],
  imports:[],
  exports:[
    PageNamePipe,
    ColorDirective
  ]
})

export class SharedModule{}
