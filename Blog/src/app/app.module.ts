import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth.interceptor";

import {registerLocaleData} from "@angular/common";
import ruLocaleDate from "@angular/common/locales/ru";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'; //сами в ручную импортируем))

//импортируем объект локализации даты - см выше , когда импорт объекта, то без {}
//далее передаем импортируемый объект ruLocaleDate и указываем id = "ru" - локаль
registerLocaleData(ruLocaleDate, 'ru') //теперь можно в пайпах где формат даты передавать локаль, все просто - см.dashbord-page шаблон

//переменная для регистрации интресептора
const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
