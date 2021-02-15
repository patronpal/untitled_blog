import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appIfNotDelete]'
})
export class IfNotDeleteDirective {

  @Input('appIfNotDelete') set IfNot(condition:boolean) {
    if (condition) {
      //показать
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      //скрыть
      this.viewContainer.clear()
    }
  }

  constructor(private templateRef: TemplateRef<any>,   //содержимое
              private viewContainer: ViewContainerRef  //по сути темплэйте и его параметр
  ) { }


}
