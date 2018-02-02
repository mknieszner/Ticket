import {ExtendedFilterModel, RowContentModel} from "../table.model";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromAppReducers from "../store/app.reducers";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FilterService {
  constructor() {

  }

  runExtendedRowFilter(row: RowContentModel, filter, filterSelect: boolean): boolean {
    if (this.isEmptyFilter(filter)) {
      return true;
    } else {
      if (filterSelect) {
        return this.anyFilter(row, filter)
      } else {
        return this.andFilter(row, filter);
      }
    }
  }

  andFilter(row: RowContentModel, filter): boolean {
    if (!this.containsAll(row.id, filter.id)) {
      return false;    }
    if (!this.containsAll(row.name || '', filter.name)) {
      return false;  }
    if (!this.containsAll(row.createdOn, filter.createdOn)) {
      return false;    }
    if (!this.containsAll(row.createdBy, filter.createdBy)) {
      return false;    }
    if (!this.containsAll(row.lastModifiedOn, filter.lastModifiedOn)) {
      return false;    }
    if (!this.containsAll(row.lastModifiedBy, filter.lastModifiedBy)) {
      return false;    }
    if (!this.containsAll(row.taskDtos.length, filter.taskDtos)) {
      return false;    }
    for (let i=0; i < row.columnValueDtos.length; i++){
        if (!this.containsAll(this.getMappedValue(row.columnValueDtos[i]), filter.columnValueDtos[i].value)) {
          return false;
        }
      }
    return true;
  }

  containsAll(rowValue, filterValue): boolean {
    if(!filterValue){
      return true;
    }
    return rowValue.toString().includes(filterValue);
  }


  anyFilter(row: RowContentModel, filter): boolean {
    let condition = true;

    if (this.containsAny(row.id, filter.id)) {
      condition = false;
    }
    if (this.containsAny(row.name || '', filter.name)) {
      condition = false;
    }
    if (this.containsAny(row.createdOn, filter.createdOn)) {
      condition = false;
    }
    if (this.containsAny(row.createdBy, filter.createdBy)) {
      condition = false;
    }
    if (this.containsAny(row.lastModifiedOn, filter.lastModifiedOn)) {
      condition = false;
    }
    if (this.containsAny(row.lastModifiedBy, filter.lastModifiedBy)) {
      condition = false;
    }
    if (row.taskDtos.length == filter.taskDtos) {
      condition = false;
    }
    row.columnValueDtos.forEach((value, i) => {
      if (this.containsAny(this.getMappedValue(value), filter.columnValueDtos[i].value)) {
        condition = false;
      }
    });
    return !condition;
  }

  runFilterTable(row: RowContentModel, filter: string): boolean { //TODO extend filter to unmodifiable fields
    let condition = false;
    row.columnValueDtos.forEach(value => {
      if (this.containsAny(this.getMappedValue(value), filter)) {
        condition = true;
      }
    });
    return condition;
  }

  containsAny(rowValue, filterValue): boolean {
    if(!filterValue){
      return false;
    }
    return rowValue.toString().includes(filterValue);
  }

  getMappedValue(object): string {
    return object[Object.keys(object)[0]].value.toString();
  }

  isEmptyFilter(filter: ExtendedFilterModel): boolean {
    let isFilterEmpty = true;
    if (!filter) return true;
    if (filter.id) isFilterEmpty = false;
    if (filter.name) isFilterEmpty = false;
    if (filter.createdOn) isFilterEmpty = false;
    if (filter.createdBy) isFilterEmpty = false;
    if (filter.lastModifiedOn) isFilterEmpty = false;
    if (filter.lastModifiedBy) isFilterEmpty = false;
    if (filter.taskDtos) isFilterEmpty = false;
    filter.columnValueDtos.forEach((value) => {
      if (value.value) isFilterEmpty = false;
    });
    return isFilterEmpty;

  }
}
