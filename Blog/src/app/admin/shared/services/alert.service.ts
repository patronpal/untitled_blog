import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export type AlertType = 'success' | 'danger' | 'warning'

export interface Alert {
  text: string
  type: AlertType
}

@Injectable()
//регистрируем класс в provider в admin.module.ts - т.к. только в админке будем использовать алерт
export class AlertService {

  //т.к. работаем с Obseravble
  //то создаем публичные переменные и это будет стрим ($)
  public alert$ = new Subject<Alert>()

  success(text:string){
    this.alert$.next({type:'success', text})
  }

  warning(text:string){
    this.alert$.next({type:'warning', text})
  }

  danger(text:string){
    this.alert$.next({type:'danger', text})
  }

}
