import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable() //не регистрируем его в скобках, т.к он только для админской части, то просто
//регистрируем его в providers в модуле admin.module.ts

//для гуардов нужно имплементироваться от CanActivated и далее AuthGuard сделать имплементацию всех значений
export class AuthGuard implements CanActivate{

  //Первое необходимо узнать есть ли активация - инжектирую переменную Authservice
  //Второе что бы делать редирект - надо инжектировать Router
  constructor(
    private auth:AuthService,
    private router: Router
    ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean  {
    //return undefined;
    //Здесь сделаем проверку на условия если пользователь авторизован или нет
    if(this.auth.isAuthenticated()){
      return true
    }else {
      this.auth.logOut() //что бы очистить все токены если они остались
      this.router.navigate(['/admin','login'],{
        queryParams:{
          loginAgain: true //здесь мы придумываем ключ и придаем ему значение - будет вот так http://localhost:4200/admin/login?loginAgain=true
          //его так же можно будет обработать на стринце login - получим queryParams и обработаем их и выведем алерт в шаблон
        }
      }) //делаем редирект
    }
  }

}

//с guard работаем в роутах где будем его указывать- в admin.module.ts
