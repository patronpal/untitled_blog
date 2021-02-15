import {Component, forwardRef, OnInit, Provider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=>MyNgComponent),
    multi: true
}

@Component({
  selector: 'app-my-ng',
  templateUrl: './my-ng.component.html',
  styleUrls: ['./my-ng.component.scss'],
  providers: [VALUE_ACCESSOR]
})

export class MyNgComponent implements ControlValueAccessor {

  private OnChange = (value: any)=>{}

  state = "Off"
  setState(stateFromButton: string) {
    this.state = stateFromButton

    this.OnChange(this.state)
  }

  registerOnChange(fn: any): void {
    this.OnChange = fn
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(state: string): void {
    // this.state = state
  }

}


