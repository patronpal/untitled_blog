import { Component } from '@angular/core';

export interface Post {
  title: string
  text: string
  id?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  posts: Post[] = [
    {title: 'Обучение Angular-components', text: 'На текущий момент изучение компонент', id: 1},
    {title: 'Обучение Angular-next steps', text: 'Здесь следующие шаги после компонент', id: 2}
  ];

  updatePosts(eventPost:Post) {
    console.log(eventPost)
    this.posts.unshift(eventPost)
  }

  takeAndDeletPostById(postId:number){
    console.log(postId)
    this.posts = this.posts.filter(p=> p.id !== postId)
  }

}

