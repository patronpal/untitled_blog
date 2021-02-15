import {Component, OnInit} from '@angular/core'
import {PostsService} from '../posts.service'
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent  implements OnInit{

  showIds = false

  constructor(public postsService: PostsService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      (qparams)=>{console.log('queryParams', qparams)
        this.showIds = !!qparams.showIds //!! - конвертация в булево true
      }
    )

    this.route.fragment.subscribe(
      (fragments)=>{console.log('Fragments',fragments)}
      )

  }

  //в случае программного управления параметрами - создаем роутер - указываем путь и передаем параметр такой же как и в html
  showIdsProgram() {
    this.router.navigate(['/posts'],
      {queryParams: {showIds:true},
      fragment: 'progFragment'})
  }
}
