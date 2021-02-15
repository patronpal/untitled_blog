import {CounterComponent} from "./counter.component";
import {FormBuilder} from "@angular/forms";

describe('counter',()=>{

  //создаем переменную, которую будем каждый раз переопределять перед каждым тестом it
  let testComponent: CounterComponent

  //функция "перед каждым тестом it" - "обнуляем" данные результата функции
  //так же есть beforeAll, afterAll, afterEach
  beforeEach(()=>{
    testComponent = new CounterComponent(new FormBuilder()) //new FormBuilder() т.к есть конструктор формы
  })

  //далее делаем тесты (мы знаем что в CounterComponent() переменная counter=0 по умолчанию - она там определена)

  it('should return increment by +1', ()=>{
    testComponent.increment()
    expect(testComponent.counter).toBe(1)
  })

  it('should return decrement by -1', ()=>{
    testComponent.decrement()
    expect(testComponent.counter).toBe(-1)
  })

  //тест для EventEmitter
  it('should return increment value event emitter by 1', ()=>{
    let result = null
    testComponent.CounterEmitter.subscribe( v=> result=v)
    testComponent.increment()
    expect(result).toBe(1)
  })

  //проверка формы: создались ли два контрола
  //можно писать через toBe а можно указать toBeTruthy - проверка на true - это Jsmin-овская тема
  it('should creat 2 controls', ()=>{
    expect(testComponent.form.contains('login')).toBe(true)
    expect(testComponent.form.contains('email')).toBeTruthy()
  })

  //проверка на валидацию
  it('should be correct logins validation when empty value', ()=>{
    const controlLogin = testComponent.form.get('login')
    controlLogin.setValue('')
    expect(controlLogin.valid).toBeFalsy() //вместо toBe и проверку на false - можно просто toBeFalsy
  })

})
