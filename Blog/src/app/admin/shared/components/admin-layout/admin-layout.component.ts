import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private router:Router,
    public auth:AuthService
  ) { }

  ngOnInit(): void {
  }

  //функцию для клика обрабатываем, что бы отменить дефолтное состояние ссылки
  //так же выше инжектируем переменную router (privat router: Router)
  //благодаря которой перенаправим при нажатии на Выход - на страницу Login
  logOut(event: Event) {
    event.preventDefault()

    //перед тем как вызвать навигацию необходимо очистить токен - вызвать сервис AuthService и там логаут
    this.auth.logOut()

    //при нажатии на Выход перенаправляем на страницу Login
    //т.е. текущий роутер(страницу) через навигацию (navigate) перенаправляем на страницу(на router) - /admin/login
    this.router.navigate(['/admin','login'])
  }
}
