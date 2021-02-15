import {someArray} from "./someArray";

describe('someArray', ()=>{

  it('should contain',()=>{
    expect(someArray()).toContain('RU')
    expect(someArray()).toContain('KG')
  })

  }
)
