import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  //delay - сколько временеи отображать alert - в нашем случае 5 сек (5000млСек)
  @Input() delay=5000

  public text: string //текст алерта
  public type: 'success' | 'danger' | 'warning' //будет специальным типом для алерта

  aSub: Subscription

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    //подпишимся на сам alert$ - на данный сабджэк
    this.aSub = this.alertService.alert$.subscribe( alert => {
      this.text = alert.text
      this.type = alert.type

      //и сделайм таймаут на вывод алерта
      const timeOut = setTimeout(()=>{
        clearTimeout(timeOut)
        this.text = ''
      }, this.delay)
    })
  }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

}
