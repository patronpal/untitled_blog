import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {PostsComponent} from "./posts/posts.component";
import {PostComponent} from "./post/post.component";
import {AboutExtraComponent} from "./about-extra/about-extra.component";
import {ErrorPostComponent} from "./error-post/error-post.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},       //  http://localhost:4200/
  {path: 'about', component: AboutComponent, canActivateChild:[AuthGuard],
    children:[{path: 'extra', component: AboutExtraComponent}]
  },  //  http://localhost:4200/about  http://localhost:4200/about/extra

  //canActivate:[AuthGuard] - тритий параметр, где в массив передаютс guard-ы
  {path: 'posts', component: PostsComponent, canActivate:[AuthGuard]},  //  http://localhost:4200/posts
  {path: 'posts/:idkey', component: PostComponent}, //динамическая обработка с припиской idkey в строке  http://localhost:4200/posts/id
  {path: 'error', component: ErrorPostComponent}, //страница ошибки
  {path: '**', redirectTo: '/error'} //проверит все роуты и если нет такого то вернет на страницу error

]

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
