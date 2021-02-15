import { Component } from '@angular/core';
import {animate, group, keyframes, query, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    //указываем тригер у которого есть его имя(далее его слушаем-баендим из шаблона) и массив статусов с описанием стилей
    //для каждого
    trigger('box', [
      state('start', style({background: 'yellow'})),
      state('end', style({background: 'red', transform: 'scale(1.5)'})),
      state('special', style({background: 'blue', borderRadius: '50%', transform: 'scale(0.5)'})),
      //так же добавляем транзишн (изменение), где от какого состояния в какое и в animate у казываем что необходимо сделать
      //например исполнить за 5сек, или тоже самое но текстом за другое время
      transition('start=>end', animate(400)),
      transition('end=>start', animate('400ms ease-in-out')),
      //можно указать через <=>* где звездочка - любой стэйт
      //а вместо сразу animate, можно указать массив шагов
      transition('special<=>*', [
        //через query можно обратиться к любому заголовку селокторов из этой области
        query('h4', animate(1500, style({color:'red'}))),
        style({background: 'orange'}),
        animate(600, style({background: 'pink'})),
        animate(600)
      ]),
      //из какого-то состояния в исчезновение (void - зарезервированнао состояние)
      //*=>void  -  :leave
      transition(':leave', [
        style({opacity:'1'}),
        //анимации можно сгруппировать что бы они работали параллельно одновременно а не последовательно
        group([
          animate(700, style({opacity:'0', transform:'scale(1.5)'})),
          animate(700, style({color:'#000', fontWeight:'bold'}))
        ])

      ]),
      //из какого-то состояния в появление (void - зарезервированнао состояние)
      //void=>*  -  :enter
      transition(':enter', [
        //animate(800, style({opacity:'0'}))
        animate('5s', keyframes([
          style({background:'red', offset: 0}),
          style({background:'blue', offset: 0.2}),
          style({background:'pink', offset: 0.3}),
          style({background:'brown', offset: 0.4}),
          style({background:'yellow', offset: 1})
        ]))
      ])
    ])
  ]
})
export class AppComponent {
  stateBox = 'start'
  stateVoid = false

  currentStateBox() {
    this.stateBox = this.stateBox==='start' ? 'end': 'start'
  }



  getEchoDone(event: AnimationEvent) {
    console.log('done', event)
  }

  getEchoStart(event: any) {
    console.log('start', event)
  }
}
