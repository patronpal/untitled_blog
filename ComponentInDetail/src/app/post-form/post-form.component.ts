import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Post} from "../app.component";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  //ViewChilde - позволяет получать DOM элемент - firstInput
  @ViewChild('firstInput', {static:false}) focusItem: ElementRef

  @Output() OnAdd: EventEmitter<Post> = new EventEmitter<Post>()

  title = ''
  text = ''

  constructor() { }

  ngOnInit(): void {
  }

  onClickButtonAndAddPost () {
    const newPost:Post = {title:this.title, text:this.text}
    this.OnAdd.emit(newPost)
    this.title = this.text = ''
  }

  focusOn () {
    this.focusItem.nativeElement.focus()
  }

}
