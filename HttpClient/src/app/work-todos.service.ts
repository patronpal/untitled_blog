import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Todo} from "./app.component";
import {catchError, delay, map, tap} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

export interface Todo2 {
  completed: boolean,
  title: string,
  id?: number
}

@Injectable({
  providedIn: 'root'
})
export class WorkTodosService {

  constructor(private http2: HttpClient) {}

  addElementTodos(): Observable<Todo2[]> {

    let myParam = new HttpParams()
    myParam = myParam.append('_limit','4')
    myParam = myParam.append('custom','anything') //добавляем параметры и переопределяем переменную

    // return this.http2.get<Todo2[]>('https://jsonplaceholder.typicode.com/todos?_limit=3')
    // return this.http2.get<Todo2[]>('https://jsonplaceholder.typicode.com/todos?', {
    return this.http2.get<any>('https://jsonplaceholder.typicode.com/todos?', {
      //первый вариант через set()  -   params: new HttpParams().set('_limit','5')
      //второй вариант через переменную
      params: myParam,
      observe: 'response',
      //observe: "events" //все события содержит

      //observe: "body" //по умолчанию
      //observe: "events" //показывает все события
    })
      .pipe(
        map(response=>{console.log('response', response)
          return response.body}),
        //tap(event => {console.log(event)}),
        delay(3000)
      )
  }

  putTodosHttp2(id:number): Observable<Todo2> {
    return this.http2.put<Todo2>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    },
      {

        headers: new HttpHeaders({
          "MyHeader": '55557777'
        })
      }
     )
      .pipe(delay(3000),
        catchError(err => {
          console.log('errorFromServiceWorkTodos',err.message)
          return throwError(err)
        })
      )
  }

}
