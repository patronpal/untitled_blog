import { Component } from '@angular/core';
import {Observable} from "rxjs";

export interface blokPost {
  title:string
  text:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {

  e: number = Math.E
  str:string = 'hello world'
  someDate = new Date()
  someNumber = 2.567
  someObj = {
    a : 2,
    b : {
      c : 3,
      d : {
        e : 4,
        f : 5
      }
    }
  }

  num1: number = 10

  viewBlok: blokPost[] = [
    {title:'Book', text:'I read notebook'},
    {title:'Table', text:'Apple on the flore'},
    {title:'Chair', text:'I am setting'},
    {title:'Sea', text:'There are a lot of fish'},
  ]

  search = ''

  addNewPostBasicUp() {
    this.viewBlok.unshift({
      title: 'Basic title up', text: 'Basic text up'
    })
  }
  addNewPostBasicDown() {
    this.viewBlok.push({
      title: 'Basic title down', text: 'Basic text down'
    })
  }

  workAsync: Observable<Date> = new Observable(obs=>{
    setInterval(() =>{obs.next(new Date())}, 1000)
  })

}

