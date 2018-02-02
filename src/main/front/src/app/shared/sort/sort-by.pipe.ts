import {Pipe, PipeTransform} from "@angular/core";
import {RowContentModel} from "../table.model";
import {SortModel} from "./sort.model";

@Pipe({name: 'orderBy'})
export class SortByPipe implements PipeTransform {

  transform(rows: RowContentModel[], sortContent: SortModel): RowContentModel[] {
    if (sortContent == null) {
      return rows;
    } else {
      console.log('sortContent', sortContent);
      switch (sortContent.dataType) {
        case 'ST':
        case 'DE':
        case 'EN':
          console.log('EN, DE, ST');
          return this.textSort(rows, sortContent.asc, sortContent.name, sortContent.index);
        case 'IN':
          console.log('IN');
          return this.numberSort(rows, sortContent.asc, sortContent.name, sortContent.index)
        case 'DT':
          console.log('DT');
          return this.dateSort(rows, sortContent.asc, sortContent.name, sortContent.index)
        default:
          return rows;
      }
    }
  }

  textSort(rows: RowContentModel[], asc: boolean, name: string, index: number): RowContentModel[] {
    switch (name) {
      case 'id':
        return this.sortNumber(rows, name, index, asc);//toremove?
      case 'name':
        return this.sortText(rows, name, index, asc);
      case 'createdBy':
        return this.sortText(rows, name, index, asc);
      case 'createdOn':
        return this.sortDate(rows, name, index, asc);//toremove?
      case 'lastModifiedBy':
        return this.sortText(rows, name, index, asc);
      case 'lastModifiedOn':
        return this.sortDate(rows, name, index, asc);//toremove?
      case 'taskDtos':
        return this.sortNumber(rows, name, index, asc);//toremove?
      case 'column':
        return this.sortText(rows, name, index, asc);
    }
  }

  numberSort(rows: RowContentModel[], asc: boolean, name: string, index: number): RowContentModel[] {
    console.log(name);
    switch (name) {
      case 'id':
        console.log('id');
        return this.sortNumber(rows, name, index, asc);
      case 'name':
        console.log('name');
        return this.sortText(rows, name, index, asc);//toremove?
      case 'createdBy':
        console.log('createdBy');
        return this.sortText(rows, name, index, asc);//toremove?
      case 'createdOn':
        console.log('createdOn');
        return this.sortDate(rows, name, index, asc);//toremove?
      case 'lastModifiedBy':
        console.log('lastModifiedBy');
        return this.sortText(rows, name, index, asc);//toremove?
      case 'lastModifiedOn':
        console.log('lastModifiedOn');
        return this.sortDate(rows, name, index, asc);//toremove?
      case 'taskDtos':
        console.log('taskDtos');
        return this.sortNumber(rows, name, index, asc);
      case 'column':
        console.log('column');
        return this.sortNumber(rows, name, index, asc);
    }
  }

  dateSort(rows: RowContentModel[], asc: boolean, name: string, index: number): RowContentModel[] {
    console.log(name);
    switch (name) {
      case 'id':
        console.log(name)
        return this.sortNumber(rows, name, index, asc);
      case 'name':
        console.log(name)
        return this.sortText(rows, name, index, asc);
      case 'createdBy':
        console.log(name)
        return this.sortText(rows, name, index, asc);
      case 'createdOn':
        console.log(name)
        return this.sortDate(rows, name, index, asc);//toremove?
      case 'lastModifiedBy':
        console.log(name)
        return this.sortText(rows, name, index, asc);
      case 'lastModifiedOn':
        console.log(name)
        return this.sortDate(rows, name, index, asc);//toremove?
      case 'taskDtos':
        console.log(name)
        return this.sortByArrayLength(rows, name, index, asc);
      case 'column':
        console.log(name)
        return this.sortDate(rows, name, index, asc);
    }
  }

  sortText(rows: RowContentModel[], field: string, index: number, asc: boolean) {
    if (field !== 'column') {
      console.log('field', field);
      rows.sort((a, b) => {
        return a[field].localeCompare(b[field]);
      })
    } else {
      rows.sort((a, b) => {
        return a.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value.localeCompare(b.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value);
      })
    }
    if (!asc) {
      return rows;
    } else {
      return rows.reverse();
    }
  }

  sortNumber(rows: RowContentModel[], field: string, index: number, asc: boolean): RowContentModel[] {
    if (field !== 'column') {
      if (field == 'taskDtos') {
        rows.sort((a, b) => {
          console.log(a[field], b[field]);
          return a[field].length - b[field].length;
        })
      } else {
        rows.sort((a, b) => {
          console.log(a[field], b[field]);
          return a[field].length - b[field].length;
        })
      }
    } else {
      rows.sort((a, b) => {
        console.log(a.columnValueDtos[index], field);
        return parseInt(a.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value) - parseInt(b.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value);
      })
    }
    return asc ? rows : rows.reverse();
  }

  sortByArrayLength(rows: RowContentModel[], field: string, index: number, asc: boolean): RowContentModel[] {
    rows.sort((a, b) => {
      return a[field].length - b[field].length;
    })
    return asc ? rows : rows.reverse();
  }

  sortDate(rows: RowContentModel[], field: string, index: number, asc: boolean): RowContentModel[] {
    if (field !== 'column') {
      rows.sort((a, b) => {
        return Date.parse(a[field]) - Date.parse(b[field]);
      })
    } else {
      rows.sort((a, b) => {
        console.log(a.columnValueDtos[index], field);
        return Date.parse(a.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value) - Date.parse(b.columnValueDtos[index][Object.keys(a.columnValueDtos[index])[0]].value);
      })
    }
    return asc ? rows : rows.reverse();
  }
}
