import {Component} from '@angular/core'
import {Router, Routes} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // инжектируем приватную переменную  router  с типом Router
  // далее обращаемся в функции к ней и вызываем метод навигации куда передаем абсолютный путь к компоненте
  constructor( private router: Router) {}

  goToPosts() {
    this.router.navigate(['/posts'])
  }
}
