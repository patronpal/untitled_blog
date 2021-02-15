import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyValidatorValidators} from "./myValidator.validators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FormsAndValidation';

  form: FormGroup

  ngOnInit() {
    this.form = new FormGroup({
      email1: new FormControl('', [
        Validators.email,
        Validators.required,
        MyValidatorValidators.verifyEmail
      ],
        [MyValidatorValidators.uniqEmail]),
      password1: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),

      //валидатор для группы
      adress: new FormGroup({
        country: new FormControl('ru'),
        capital: new FormControl('', [
          Validators.required
        ])
      }),

      //динамическая валидация - обработка массива контролов (изначально пустой)
      mySkills: new FormArray([])

    })
  }

  submit() {
    console.log(this.form)
    const formDate = {...this.form.value} //... - это спред
    console.log(formDate)

    if (this.form.valid){
      console.log('форма валидна!')
    }

    //очистка формы после submit
    this.form.reset()

  }

  chooseCapital() {
    const cityMap = {
      ru: 'Moscow',
      by: 'Minsk',
      ua: 'Kiev'
    }
    const cityValue = this.form.get('adress').get('country').value
    console.log(cityMap[cityValue])
    const city:string = cityMap[cityValue]
    this.form.patchValue({adress:{capital:city}})
  }

  addMySkills() {
    const skillControl = new FormControl('',Validators.required);
    //(<FormArray>this.form.get('mySkills')).push()
    //(<FormArray>this.form.get('mySkills')).push()
    (<FormArray>this.form.get('mySkills')).push(skillControl)
    console.log(this.form.get('mySkills'))
  }
}


//*ngFor="let control of form.get('mySkills').controls ; let idx = index"

