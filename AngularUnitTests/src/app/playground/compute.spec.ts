//импортируем в файл с тестами функцию, которую необходимо проверить
import {compute} from "./compute";

//используем метод describe - это метод frameworks: ['jasmine', '@angular-devkit/build-angular']
//где два параметра:
// проверяемая функция(просто текст для дальнейшего поиска его в отчете)
// колбэк функция, где идет сама проверка с описанием условий проверки
describe('compute', ()=>{

  //функция it - в которой указываем текс условия проверки, и создаем условие
  //далее expect помещаем результат условия выполнения и указываем чему он должен быть равен
  it('should return 0 if negativ', ()=>{
    const result = compute(-2)
    expect(result).toBe(0)
  })

  it('should return increment (+1) if positive', ()=>{
    const result = compute(3)
    expect(result).toBe(4)
  })

})
