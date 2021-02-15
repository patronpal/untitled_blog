import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable ({ providedIn:'root' })  //инжектируем наш guard как и сервис, но для того что бы можно было в него передавать сервис Auth через конструктор


export class AuthGuard implements CanActivate, CanActivateChild{  //что бы guard заработал надо его имплеминтировать от CanActivate,
  //а для дочернего роута что бы применить надо CanActivateChild и создать к нему метод

  //в конструкторе после того как инжектировали выше guard - через конструктор создаем переменную с типом из сервсиса auth
  //к которой есть теперь доступ
  constructor(
    private authFromService: AuthService,
    private router: Router //для дальнейшего редиректа в методе canActivate
  ) {
  }

  //сделаем метод canActivate(){}
  canActivate(
    route: ActivatedRouteSnapshot, //первый параметр
    state: RouterStateSnapshot)    //второй параметр
    : Observable<boolean> | Promise<boolean> | boolean { //варианты возвращаемых параметров

    //вызываем черерз сервис метод isAuthenticated(), который вернет promise<boolean>
    //далее вызываем then(), где относительно возвращаемого значения - через переменную - делаем логику проверки
    //если созданная переменная с полученным значение isAuthNow = true то вернем true
    // иначе false - и тогда мы можем в данном методе canActivate - отрпавить пользователя на другую страницу - сделать редирект
    return this.authFromService.isAuthenticated().then(
      isAuthNow => {
        if(isAuthNow){return true} else {
          //сделаем редирект на главную страницу и укажем в queryparametrs - auth=false
          //т.е. будет ?auth=false - ну просто что бы было понятно что нет авторизации и чел пытается пройти на страницу куда нельзя ему
          this.router.navigate(['/'],
            {
              queryParams:{authNow:false}
            })
        }
      }
    )
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route,state)
  }


}
