import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";

export class MyValidatorValidators{

  //статическая функция
  //получает параметр в виде контрола с типом FormControl
  //возравщает объект в виде ключа-строки и значением булево
  //return null - если ошибки нет, т.е. значение валидтора = null
  //а если не null, то необходимо обработать результат
  static verifyEmail(control: FormControl): {[key:string]: boolean} {
    //если массив содержит значение переданного control-а, то вернуть ключ со значением
    if (['1@mail.ru','2@mail.ru'].includes(control.value)) {
      return{
        //[key: string]:boolean - ключ можно/нужно писать без кавычек
        emailNotVerification: true
      }
    }
    return null
  }

  //асинхронный валидатор
  static uniqEmail(control:FormControl):Observable<any> | Promise<any>{
    return new Promise(resolve => {
      setTimeout(()=>{
        if (control.value==='5@mail.ru'){
          resolve({uniqalEmail:true})
        } else {resolve(null)}
        }, 5000)
      }
    )
  }

}
