import {Pipe, PipeTransform} from "@angular/core";
import {ExtendedFilterModel, RowContentModel} from "../table.model";

import {FilterService} from "./filter.service";
@Pipe({ name: 'extendedFilter' })
export class ExtendedFilterPipe implements PipeTransform {
  constructor(private filterService: FilterService){

  }
  transform(rows: RowContentModel[], extendedFilterContent: ExtendedFilterModel, filterSelect: boolean) {
    return rows.filter(row => this.filterService.runExtendedRowFilter(row,extendedFilterContent, filterSelect));
  }
}
