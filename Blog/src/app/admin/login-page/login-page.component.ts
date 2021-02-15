import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  //заведем переменную form с типом FormGroup
  //и т.к. мы работать будем с реактивными формами, то надо зарегистрировать в файле admin.module.ts их
  //и после этого есть полный доступ к переменной form (например в OnInit - где ее инициализируем и указываем контролы)
  //Затем в шаблоне указываем прослушку для переменной [formGroup]="form" (ngSubmit)="submit(), где на данный метод идет проверка на
  //всю форму - валидна она или нет и если она false то return на саму себя
  form: FormGroup

  submitted = false //флаг для конпки - переносим в шаблон, где делаем проверку там же где валидность формы (для блокировки кнопки, что бы не было возможности нажимать много раз сразу)

  message: string //сообщение для обработки queryParams

  constructor(
    //импортируем два сервиса через приватные переменные: AuthService и Router(для редиректа)
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute //текущий роут - что бы получить текущие queryParams
  ) { }


  ngOnInit() {

    //обработка текущего роута для получения queryParams
    this.route.queryParams.subscribe((params:Params)=>{
      if(params['loginAgain']){
        this.message = 'Необходимо активировать вход'
      }else if(params['authFailed']){
          this.message = 'Текущая сессия истекла, неоходимо авторизоваться'
        }

    })
    //--------------------------------------------------

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required, //валидация на то что он обязательно заполнен
        Validators.email     //валидация на email
      ]),
      password: new FormControl(null, [
        Validators.required, //валидация на то что он обязательно заполнен
        Validators.minLength(6) //валидация на то что должно быть минимум 6 символов
      ])
    })
  }

  submit() {

    if (this.form.invalid){
      return
    }

    this.submitted = true

    //предвариетильно создаем файл interfaces.ts
    //где указываем експорт объекта User с его описанием
    //далее можем здесь создать переменную с типом User и присвоить соотвествующим полям значения с формы (form)
    //user - это объект! с типом User
    const user:User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    //когда мы жмем Вход - мы вызываем submit(), т.к. мы слушаем форму и сабмитим ее через (ngSubmit)="submit()"
    //и мы хотим в целом залогиниться
    //подписываемся через subscribe, на стрим this.auth.login(user)
    //и если все хорошо, то перегружаем форму this.form.reset() и делаем редирект на страницу /admin/dashboard
    this.auth.login(user).subscribe(()=>{
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])

      this.submitted = false
    }, ()=> {this.submitted = false})

  }
}
