import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutstring',
  standalone: true
})
export class CutstringPipe implements PipeTransform {

  transform(value: string, separator: string,numOfWords:number,newSeparator:string): string {
    return value.split(separator,numOfWords).join(newSeparator);
  }

}
