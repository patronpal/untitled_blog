import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {PostPageComponent} from "./post-page/post-page.component";
import {AdminModule} from "./admin/admin.module";

const routes: Routes = [
  //роуты для работы с постами
  {path:'', component:MainLayoutComponent, children:[
      {path:'', redirectTo:'/', pathMatch:'full'},
      {path:'', component: HomePageComponent},
      {path:'post/:id', component: PostPageComponent}
    ]},
  //админские роуты
  //указываем относительный путь где находятся роуты - в файле admin.module и после # указываем класс
  {
    path:'admin', loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  //вторым параметром в forRoot передаем объект - для лэйзилоадинга
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
