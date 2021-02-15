import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from "@angular/core";

@Directive({
  selector: '[appStyle]'
})
export class StyleDirective{

  @Input('appStyle') backgroundColor:string

  @Input() dStyles: {border?:string, borderRadius?:string}

  @HostBinding('style.backgroundColor') elBackgroundColor:string = null

  constructor(private elRef: ElementRef, private rend: Renderer2 ) {
    console.log(elRef)
    //elRef.nativeElement.style.color = 'red' //так можно писать для web-а, но лучше как ниже
    this.rend.setStyle(this.elRef.nativeElement, 'color', 'blue')
  }

  @HostListener('mouseenter') onMouseEnter(){
    //this.rend.setStyle(this.elRef.nativeElement, 'backgroundColor', 'yellow') //можно и так а можно и как ниже через хостбаендинг
    this.elBackgroundColor = this.backgroundColor; //или любой другой цвет - здесь баендинг идет через @HostBinding конкретного стиля

    this.rend.setStyle(this.elRef.nativeElement, 'color', 'red')
    this.rend.setStyle(this.elRef.nativeElement, 'border', this.dStyles.border)
    this.rend.setStyle(this.elRef.nativeElement, 'borderRadius', this.dStyles.borderRadius)
  }

  @HostListener('mouseleave') onMouseLeave(){
    //this.rend.setStyle(this.elRef.nativeElement, 'backgroundColor',null)
    this.elBackgroundColor = null;

    this.rend.setStyle(this.elRef.nativeElement, 'color', null)
    this.rend.setStyle(this.elRef.nativeElement, 'border', null)
    this.rend.setStyle(this.elRef.nativeElement, 'borderRadius', null)
  }

  // @HostListener('click') onMouseClick(){
  //   this.rend.setStyle(this.elRef.nativeElement, 'color', 'yellow')
  //   this.rend.setStyle(this.elRef.nativeElement, 'border', this.dStyles.border)
  //   this.rend.setStyle(this.elRef.nativeElement, 'borderRadius', this.dStyles.borderRadius)
  // }

  //@HostBinding()

}
