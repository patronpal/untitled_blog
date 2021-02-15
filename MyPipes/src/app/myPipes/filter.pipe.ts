import { Pipe, PipeTransform } from '@angular/core';
import {blokPost} from "../app.component";

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(posts: blokPost[], search: string = ''): blokPost[] {
    if (!search.trim()){
      return posts} else {
      return posts.filter(post => {
        //return post.title.includes(search)
        return post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      })
    }
  }

}
