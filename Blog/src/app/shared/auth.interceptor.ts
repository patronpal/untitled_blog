import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../admin/shared/services/auth.service";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

  constructor(
    private auth:AuthService,
    private router:Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //если пользователь авторизован, то для каждого запроса необходимо добавлять токен (пользователь авторизован и у него есть токен)
    if(this.auth.isAuthenticated()){
      req = req.clone({
        setParams:{
          auth: this.auth.token
        }
      })

    }
    return next.handle(req)
      .pipe(
        tap(()=>{console.log('Intercept')}),

        catchError((error:HttpErrorResponse)=>{

          console.log('Interceptor ERROR', error)

          if(error.status === 401){
            this.auth.logOut()
            this.router.navigate(['/admin','login'], {
              queryParams:{
                authFailed:true //и обработаем данный параметр на стринице логина
              }
            })
          }

          return throwError(error) //throwError - делаем из объекта обшики - объект Observable
        })
      )
  }

}
