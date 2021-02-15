import {NgModule} from "@angular/core";

import {AboutPageComponent} from "./about-page.component";
import {AboutExtraPageComponent} from "./about-extra-page/about-extra-page.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations:[
    AboutPageComponent,
    AboutExtraPageComponent
  ],
  imports:[
    CommonModule,
    SharedModule,

    RouterModule.forChild([
        {path: 'about', component: AboutPageComponent, children: [
            {path: 'extra', component: AboutExtraPageComponent}
          ]}])

  ],
  exports:[RouterModule]
})

export class AboutModule{}
