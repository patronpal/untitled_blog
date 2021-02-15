import { Component, OnInit } from '@angular/core';
import {RatesService} from "../../services/rates.service";
import {Rates} from "../../interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {

  rates$: Observable<Rates[]>

  constructor(
    private ratesService: RatesService
  ) { }

  ngOnInit(): void {
    this.rates$ = this.ratesService.getRates()
  }
}
