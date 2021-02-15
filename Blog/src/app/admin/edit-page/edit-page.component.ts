import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../../shared/posts.service";
import {switchMap} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy{

  form: FormGroup
  ourPost: Post

  flagSubmited = false

  uSub: Subscription

  constructor(
    private route: ActivatedRoute, //текущий роут - импортируем сюда в виде переменной routeб
    private postsService: PostsService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    //подписываемся на текущий роут с параметрами и должны получить эти параметры и далее текущий пост
    //из Postsservice - там сделаем метод getById() - где по id можно получить текущий пост из базы данных

    this.route.params.pipe(
      switchMap((params:Params)=>{
        console.log("Тут пост для редактирования:", this.postsService.getById(params['id']))
        return this.postsService.getById(params['id'])
      })
    ).subscribe( (post:Post) => {
      this.ourPost = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })

  }

  submit() {
    if(this.form.invalid){
      return
    }

    this.flagSubmited = true

    this.uSub = this.postsService.update({
      ...this.ourPost,
      title: this.form.value.title,
      text: this.form.value.text
    }).subscribe(() => {
      this.flagSubmited = false
      this.alert.danger('Пост был успешно отредактирован!')
    })
  }

  ngOnDestroy() {
    if(this.uSub){
      this.uSub.unsubscribe()
    }
  }

}


