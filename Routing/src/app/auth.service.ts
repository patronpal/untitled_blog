//сервис который будет эмулировать аунтификацию - вход выход

import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})

export class AuthService {
  private isAuth = false

  logIn(){
    this.isAuth = true
  }

  logOut(){
    this.isAuth = false
  }

  //смоделируем методо проверки статуса логирования
  //данный метод будет возвращать promise с типом boolean
  isAuthenticated():Promise<boolean>{
    return new Promise<boolean>(
      resolve => {
        setTimeout(()=>{resolve(this.isAuth)},2000)
      })
  }

}

//далее инжектируем данный сервис в app component
