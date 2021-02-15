import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked, AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef, EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import {Post} from "../app.component";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
{

  @Input() myPost:Post
  //static: true - только в ngOnInit()
  @ContentChild('info', {static: true}) infoRef: ElementRef

  @Output() forDeletEvent = new EventEmitter<number>()

  constructor() { }
  //delete post - look here: OutInput
  deletePost(){
    this.forDeletEvent.emit(this.myPost.id)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', changes)
  }

  ngOnInit(): void {
    console.log(this.infoRef.nativeElement)
  }

  ngDoCheck() {
    console.log('ngDoCheck')
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit')
  }

  ngAfterContentChecked() {
    console.log('AfterContentChecked')
  }

  ngAfterViewInit() {
    console.log('AfterViewInit')
  }

  ngAfterViewChecked() {
    console.log('AfterViewChecked')
  }

  ngOnDestroy() {
    console.log('OnDestroy')
  }




}
