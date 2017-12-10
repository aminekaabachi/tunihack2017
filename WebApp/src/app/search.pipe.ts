import { Pipe, PipeTransform } from '@angular/core';
import { UpperCasePipe } from '@angular/common';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(input: any, str?: any): any {
     
      if (!input) return;
      
      let re = new RegExp(str,'g');
   
      return input.filter(obj => {
        for(let attr in obj) {
          if ((""+obj[attr]).match(re) )return obj;
        }
      });

  }
}