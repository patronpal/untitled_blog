import {PostsService} from "./posts.service";
import {PostsComponent} from "./posts.component";
import {EMPTY, of} from "rxjs";

describe('PostsComponent', () => {

  let service: PostsService
  let component: PostsComponent

  beforeEach(()=>{
    service = new PostsService(null) //можно null тк ни куда на сервер ни чего не отправляем
    component = new PostsComponent(service)
  })

  it('should work fetch when OnInit', () => {

    //в жасмин есть фукнция шпионить за методами сервиса,
    //где первый параметр - сервис, второй параметр строка название метода -  fetch
    //и далее обращение как с самим методом сервиса
    const spy = spyOn(service,'fetch').and.callFake(()=>{
      return EMPTY
    })

    component.ngOnInit()
    expect(spy).toHaveBeenCalled()

  })

  it('should work fetch when OnInit and try Array', () => {

    //проверка - возвращает ли массив
    //отправляем массив и проверям его длину при возврате - в нашем случае 3
    spyOn(service,'fetch').and.callFake(()=>{
      return of([1,2,3])
    })

    component.ngOnInit()
    expect(component.posts.length).toBe(3)

  })

})
