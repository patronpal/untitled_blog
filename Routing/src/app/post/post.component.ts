import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Post, PostsService} from "../posts.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postParams: Post

  constructor(private route: ActivatedRoute,
              private PostService: PostsService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      console.log('Params', params) //какие есть параметры - и они в строковом формате!!!!!!!
      this.postParams = this.PostService.getById(+params.idkey) //+ перевод в формат числа
    })
  }

  loadPost4() {
    this.router.navigate(['/posts',44])
  }
}
