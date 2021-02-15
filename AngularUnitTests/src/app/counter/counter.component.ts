import {Component, EventEmitter, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import validate = WebAssembly.validate;

@Component({
  selector: 'app-counter',
  template: `Counter: {{counter}}`
})

export class CounterComponent{

  counter = 0

  public form: FormGroup

  constructor(public fb: FormBuilder) {
    this.form = fb.group({
      login:['', Validators.required],
      email:['']
    })
  }


  //когда идет передача данных в родительский функционал "выше" - ну как пример
  @Output() CounterEmitter = new EventEmitter<number>()


  increment(){
    this.counter++
    this.CounterEmitter.emit(this.counter) //для передачи "выше" заэмитили текущее значение counter
  }

  decrement(){
    this.counter--
  }

}
