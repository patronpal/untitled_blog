import {Component, OnInit} from '@angular/core'
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs/operators";
import {WorkTodosService} from "./work-todos.service";

export interface Todo {
  completed: boolean,
  title: string,
  id?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  //через конструктор заводим переменную http1 с типом HttpClient - и далее работаем уже с этой переменной
  //у которой есть множество методов: get, post, push...
  constructor(private http1: HttpClient, private workTodoService: WorkTodosService) {}


  //заводим переменную с типом массив (как у интерфейса)
  Todos: Todo[] = []

  todoTitle: string = ''

  loading= false

  someError = ''

  ngOnInit() {
    this.fitchTodos()
  }

  adTodo() {
    if (!this.todoTitle.trim()) {
      return
    }

    //без id создаем переменную т.к его получим с сервера когда туда сделаем пост нового этого туду
    const postTodo: Todo = {
      completed: false,
      title: this.todoTitle
    }

    //отправляем через post элемент по адресу где он добавляется и смотрим ответ в консоли
    //id = 201 - их было 200 изначально
    //ответ сервера = 201 - означает что сгенерирован новый элемент по запросу
    this.http1.post<Todo>('https://jsonplaceholder.typicode.com/todos', {postTodo}).subscribe(
      resPost => {
        console.log(resPost)
      }
    )

    //добавим в массив новый элемент
    this.Todos.push(postTodo)
    console.log('Todos', this.Todos)

    //очистим поле
    this.todoTitle = ''
  }

  fitchTodos() {
    this.loading = true
    //обращение к переменной http1 с запросом, который возвращает массив.
    //subscribe() - прослушать, где указываем переменную/функцию callback -
    // которая будет давать результат в консоль данного subscribe()

    //добавим задержку через метод /pipe() и внутри вызовим задержку delay равную 3 сек
    //import {delay} from "rxjs/operators";
    this.http1.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
      .pipe(delay(3000))
      .subscribe(
      someRes => {
        console.log(someRes)
        this.Todos = someRes
        console.log('Todos',this.Todos)
        this.loading = false
      }
    )



  }

  //удаление элемента
  removeTodo(id: number) {
    this.http1.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(()=>{})
      //отфильтруем массив где остануться все элементы не равные полученному id
    this.Todos = this.Todos.filter(t => t.id !== id)
  }

  //Работа с сервисом куда лучше выносить HttpClient
  //обращаемся в сервис workTodos

  //добавить массив элементов
  adTodosHttp2(){
    this.loading = true
    this.workTodoService.addElementTodos()
      .subscribe(
        someRes => {
          this.Todos = someRes
          this.loading = false
        })
  }

  putTodos(id:number) {
    this.workTodoService.putTodosHttp2(id).subscribe(
      putTodo => {this.Todos.find(t => t.id===putTodo.id).completed = true},
      error => {
        this.someError = error.message
        console.log('errorFromApp',this.someError)
      }
    )

  }

}

