//интерфейс пользователя
export interface User {
  email:string
  password:string
  returnSecureToken?: boolean
}

//интерфейс ответа при аутентификации в FireBase
export interface FbAuthResponse {
  idToken: string
  expiresIn: string //сколько живет токен
}

//интерфейс поста
export interface Post {
  id?: string
  title: string
  text: string
  author: string
  date: Date
}

//
export interface FbCreateResponse {
  name: string
}
