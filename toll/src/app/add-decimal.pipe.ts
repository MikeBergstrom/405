import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addDecimal'
})
export class AddDecimalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = value/100;
    return value;
  }

}
