import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FbCreateResponse, Post} from "./interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";


@Injectable({providedIn:'root'})  //регистрируем рут, т.к его надо будет зарегать в главном модуле и он будет в разных модулях использоваться

export class PostsService {

  constructor(private http:HttpClient) {}

  //в эту функцию будем передавать данные поста с формы для дальнейшей его передачи на сервер -бэк
  //и возвращать ответ поместили или нет
  create(post:Post): Observable<Post>{
    return this.http.post(`${environment.FbDbUrl}/posts.json`, post)
      .pipe(map((response:FbCreateResponse)=>{
        return {
          title: post.title,
          text: post.text,
          author: post.author,//первые три можно было указать как  - ...post - оператор spred спрэд - это три точки - автозаполнение данными
          id: response.name,
          date: new Date(post.date)}
      }))
  }


  getAll(){
    return this.http.get<Post[]>(`${environment.FbDbUrl}/posts.json`)
      .pipe(map((response:{[key:string]:any})=>{
        return Object.keys(response)      //Object.keys(response) - метод перебрать все значения response - в итоге массив id-шников
          .map(key=>({
            ...response[key],
            id: key,
            date: response[key].date
          }))                   //далее map который преобразует массив и у него через key(здесь будет это id записи массива) вернуть объект поста
      }))
  }

  //удалить пост из базы данных по id
  remove(id: string):Observable<void> {
    return this.http.delete<void>(`${environment.FbDbUrl}/posts/${id}.json`)
  }

  //получить пост по id и далее распарсить ответ как делать в методе create
  getById(id:string): Observable<Post>{
    return this.http.get<Post>(`${environment.FbDbUrl}/posts/${id}.json`)
      .pipe(map((post:Post)=>{
        return {
          ...post, id,
          date: new Date(post.date)}
      }))
  }

  update(post:Post): Observable<Post>{
    //метод patch позволяет обновлять частично данные в уже существующих записях
    return this.http.patch<Post>(`${environment.FbDbUrl}/posts/${post.id}.json`, post)
  }

}
