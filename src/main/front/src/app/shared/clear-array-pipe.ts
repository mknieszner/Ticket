
import {Pipe, PipeTransform} from '@angular/core';
import {EnumInfoModel} from "./statistics/table-info.model";

@Pipe({
  name: 'clearArray'
})
export class ClearArrayPipe implements PipeTransform{
  transform(array: any[]) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (typeof array[i] != "undefined") {
        newArray.push(array[i]);
      }
    }
    return newArray;
  }
}

