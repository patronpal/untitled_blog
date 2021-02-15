import {greetName} from "./greetName";

describe('greetName',()=>{

  //можно использовать toContain - где указывать что должно включаться в результате,
  //а не быть "жестким" результатом
  //ответ должен содеражть Andrey
  it('should return contain Name', ()=>{
    expect(greetName('Andrey')).toContain('Andrey')
  })

})
