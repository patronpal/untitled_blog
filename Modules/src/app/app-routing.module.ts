import {NgModule} from '@angular/core'
import {PreloadAllModules, RouterModule} from '@angular/router'
import {HomePageComponent} from './home-page/home-page.component'
import {importType} from "@angular/compiler/src/output/output_ast";

const routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  //Ленивая загрузка отдельных страниц
  //Вариант первый - типа постаринке
  //для "ленивой" загрузки указывается особый путь к модулю (куда просто вынесена загрузка)
  //loadChildren: указать путь к модулю, но вместо .ts = #ИмяМодуляБезТочекИРасширения
  //{path:'', loadChildren: './about-page/about.module#AboutModule'}

  //Вариант второй - типа камельфо
  //колбэк функция которая получает из importa какой-то promise и из него методом then достаем необходимый модуль через
  //колбэк функцию m => m.AboutModule - указывая нужный модуль
  {path:'', loadChildren: ()=> import('./about-page/about.module').then(m => m.AboutModule)}
]

@NgModule({
  //после массива роутов (вынесли их в константу-массив), можно указать стратегию загрузки
  //т.е. при загрузке главное страницы - ее компоненты и модулю будут загружены,
  //а остальные загружаются в фоне!!!
  //и при переходе эти модули уже загружены и готов к работе!!!
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
