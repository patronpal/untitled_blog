import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppComponent} from './app.component'
import {FormsModule} from '@angular/forms'
import {HomePageComponent} from './home-page/home-page.component'
import {AppRoutingModule} from './app-routing.module'

import {AboutModule} from "./about-page/about.module";
import {SharedModule} from "./shared/shared.module";
//sdfds



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    //AboutModule,  закомментировал для "ленивой"(отработает загрузка модуля в момент нажатия на кнопку) загрузки
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
