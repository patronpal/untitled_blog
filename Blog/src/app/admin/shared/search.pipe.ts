import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../../shared/interfaces";

@Pipe({
  name: 'searchPosts'
})

export class SearchPipe implements PipeTransform{
  //получаем массив posts, аргументы search  и возвращать будем массив постов с типом Post[]
  transform(posts: Post[], search: ''): Post[] {
    //если в поисковой строке убрать пробелы (trim()) и она пустая, то вернуть массив текущих постов
    if(!search.trim()){
      return posts
    }

    return posts.filter(post => {
      //возвращаем включение в массив постов тот пост, который включает в себя строку поиска приведенную к нижнему регистру,
      //а перед этим и title приводим к нижнему регистру
      return post.title.toLowerCase().includes(search.toLowerCase())
    })

  }

}
