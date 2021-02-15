import {Injectable} from "@angular/core";
import {LogService} from "./log.service";

@Injectable({providedIn:'root'}) //балгодаря переменной зарегистрирует автоматически в корневой каталог данный сервис
export class AppCounter1Service{

  constructor(private servLog: LogService) {
  }

  //если есть @Injectable декаратор, то можно в данный сервис через конструктор добавить работу с другим сервисом
  //тем самым связав их вместе


  counter1 = 0

  counterUp(){
    this.counter1++
    this.servLog.log('up')

  }

  counterDown(){
    this.counter1--
    this.servLog.log('down')
  }

}
