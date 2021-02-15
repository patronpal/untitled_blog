import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FbAuthResponse, User} from "../../../shared/interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";



@Injectable({providedIn:'root'})
//зарегистрируем данный сервис на уровне админского модуля - admin.module.ts - через providers:[AuthService]
//poriderIn в @Injectable( здесь ) можно не писать т.к зарегистрировали сами
export class AuthService {

  public error$: Subject<string>= new Subject<string>() //переменная-объект, с типом сторка

  constructor(private http: HttpClient) {
  }

  //геттер - токен, который будет прилетать с сервера (он динамичен)
  //используем геттер а не переменную простую - т.к. будет комплексная проверка на истек или нет токен и т.д.
  get token():string {
    const expDate = new Date(localStorage.getItem('fb-token-exp')) //оборачиваем строку в дату и получаем тип Даты
    if(new Date() > expDate){
      //дата токена просрочена, то вызываем logOut() и так же возвращаем null
      this.logOut() //здесь чистим всю логику по токену
      return null
    }
    return localStorage.getItem('fb-token')
  }

  //Залогиниться
  login(user:User): Observable<any>{
    user.returnSecureToken = true
    //для того что бы залогиниться нужен post запрос
    //url взяли из firebase - подключение по логину и паролю
    //и заменяем ключ в тексте на наш енвайромент согласно интерфейса с ключом!!!
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      //через pipe обратимся к методу rxJs tap в ктором обратимся в setToken, где он получает response
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this)) //отлавливаем ошибки и передаем в приватный метод handleError(сами создали), где обрабатываем ошибки
      )
  }

  private handleError(error: HttpErrorResponse){
    const {message} = error.error.error

    //console.log('message', message)

    //используем switch на обработку ошибок
    switch (message) {
      case 'INVALID_PASSWORD':
        this.error$.next('Не верный пароль')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Не верный email')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Данный email не найден')
        break
    }

    return throwError(error)
  }

  //Разлогиниться - выйти из системы
  logOut(){
    this.setToken(null) //отправим со значение null и очистим данные по токену
  }

  //Метод проверки - авторизован или нет пользователь
  //возвращает true/false
  //!!this.token - через дважды !! (двойное отрецание) - можно привести любое значение к true/false
  isAuthenticated(): boolean {
    return !!this.token
  }

  //здесь приватный методо - который будет позволять изменять токен
  private setToken(response: FbAuthResponse | null) {
    //console.log('setToken!!!',response)

    if(response) {

      //expDate - дата жизни токена(соединения), равная:
      // текущая дата по времени new Date().getTime() плюс
      // +response.expiresIn количество секунд "жизни" из ответа, где через "+" строку превращаем в число
      // и умножаем ответ из FB на 1000 что бы получить милисекунды...ну и суммируем!
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)

      //далее буду хранить в локальных стораджах полученные значения
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      //если null то значит логаут и надо очистить локалстордж
      localStorage.clear()
    }
  }

}
