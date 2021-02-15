import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Rates} from "../interfaces";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(
    private http: HttpClient
  ) { }

  getRates(){
    return this.http.get<Rates[]>('https://api.binance.com/api/v3/ticker/price')
      .pipe(
        map(response=>{
          return response}
          )
      )
  }

}
