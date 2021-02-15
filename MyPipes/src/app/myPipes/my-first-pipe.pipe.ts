import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFirstPipe'
})
export class MyFirstPipePipe implements PipeTransform {

  //transform(value: unknown, ...args: unknown[]): unknown {
  transform(num: number, arg: number = 1): number {
    return num*arg;
  }

}
