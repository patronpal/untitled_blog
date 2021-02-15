import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Observable, Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSub: Subscription //переменная для того что бы проверять подписку что бы ни чего не было заполнено
  dSub: Subscription
  searchStr = ''

  constructor(
    private postService: PostsService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {

    //сделаем подписку на получение всех постов и будем этот массив присваивать переменной с типом Post[] (массив постов)
    //this.pSub = так можно организовать контролируюемую подписку, которую позже можно будет удалять
    this.pSub = this.postService.getAll().subscribe(postsfromAll => {
      this.posts = postsfromAll
    })
  }

  remove(id: string) {
    this.dSub = this.postService.remove(id).subscribe(()=>{
      this.posts = this.posts.filter(post=> post.id !== id)
      this.alert.warning('Пост был удален!')
    })
  }

  //делаем отписку от подписки )))
  ngOnDestroy() {
    if(this.pSub){
      this.pSub.unsubscribe()
    }

    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }



}
