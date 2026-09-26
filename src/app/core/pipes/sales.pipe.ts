import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sales',
  standalone: true
})
export class SalesPipe implements PipeTransform {

  transform(value: string): string {
    return `On Sale ${value}`;
  } 
}
