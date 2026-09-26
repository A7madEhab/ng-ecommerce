import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOnSearch',
  standalone: true
})
export class FilterOnSearchPipe implements PipeTransform {

transform(items: any[], searchKey: string): any[] {
  
    if (!items || items.length === 0) return [];
    if (!searchKey || searchKey.trim() === '') return items;

    const term = searchKey.toLowerCase().trim();

    return items.filter(item => {
      if (item && item.title) {
        return item.title.toString().toLowerCase().includes(term);
      }
      return false;
    });
  }

}