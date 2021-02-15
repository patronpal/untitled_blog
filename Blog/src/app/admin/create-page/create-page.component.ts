import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostsService} from "../../shared/posts.service";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup

  constructor(
    private alert: AlertService, //инжектируем алерт-сервис для использования алерта
    private postService:PostsService
  ) { } //сюда инжектруем переменную сервиса работы с постами и базой данных

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null,Validators.required),
      author: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required)
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    //Если форма сабмитится, то создаем переменную "пост" с данными согласно формы
    const post:Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    }

    //здесь отрпавим в сервис работы с постами и базой данных: создание нового поста
    //далее подпишимся на результат и в случае если все отлично, то очистим форму - reset
    this.postService.create(post).subscribe(()=>{
      this.form.reset()

      //и допустим здесь когда пост создан, то можно вызвать алерт на какое-то время (таймаут выставлен в сервисе у алерта)
      this.alert.success("Пост успешно создан!")
    })

    //console.log('post!!!', post)


  }

}
