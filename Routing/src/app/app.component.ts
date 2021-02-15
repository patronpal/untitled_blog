import {Component} from '@angular/core'
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //инжектируем сервис AuthService - что бы в шаблоне можно было реализовать логику кнопок и обратиться к сервису
  constructor( public auth: AuthService) {}
}

