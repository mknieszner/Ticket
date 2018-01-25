import {ExtendedFilterModel, RowContentModel} from "../../shared/table.model";

export class FilterService {

  runExtendedFilterTable(row: RowContentModel ,filter: ExtendedFilterModel):boolean {
    // console.log('filter', filter);

    let condition = true;
    if ((row.id.toString()).includes(filter.id)) {
      // console.log(this.row.id.toString(),filter.id,(this.row.id.toString()).includes(filter.id));
      condition = false;
    }
    if ((row.name || '').includes(filter.name)) {
      // console.log(row.name || '',filter.name,(this.row.name || '').includes(filter.name));
      condition = false;
    }
    if ((row.createdOn.toString()).includes(filter.createdOn)) {
      // console.log(this.row.createdOn.toString(),filter.createdOn,(this.row.createdOn.toString()).includes(filter.createdOn));
      condition = false;
    }
    if ((row.createdBy.toString()).includes(filter.createdBy)) {
      // console.log(this.row.createdOn.toString(),filter.createdOn,(this.row.createdOn.toString()).includes(filter.createdOn));
      condition = false;
    }
    if ((row.lastModifiedOn.toString()).includes(filter.lastModifiedOn)) {
      // console.log(this.row.lastModifiedOn.toString(),filter.lastModifiedOn,(this.row.lastModifiedOn.toString()).includes(filter.lastModifiedOn));
      condition = false;
    }
    if ((row.lastModifiedBy.toString()).includes(filter.lastModifiedBy)) {
      // console.log(this.row.lastModifiedBy.toString(),filter.lastModifiedBy,(this.row.lastModifiedBy.toString()).includes(filter.lastModifiedBy));
      condition = false;
    }
    row.columnValueDtos.forEach((value, i) => {
      if (((this.getMappedValue(value)).includes(filter.columnValueDtos[i].value))) {
        // console.log(this.getMappedValue(value),filter.columnValueDtos[i].value,(this.getMappedValue(value)).includes(filter.columnValueDtos[i].value));
        condition = false;
      }
      if ((row.taskDtos.length == filter.taskDtos)) {
        // console.log(this.row.lastModifiedBy.toString(),filter.lastModifiedBy,(this.row.lastModifiedBy.toString()).includes(filter.lastModifiedBy));
        condition = false;
      }
    });
    // console.log(filter, this.row, condition)
    return !condition;
  }

  runFilterTable(row: RowContentModel, filter: string): boolean { //TODO extend filter to unmodifiable fields
    let condition = false;
    row.columnValueDtos.forEach(value => {
      if (((this.getMappedValue(value)).includes(filter))) {
        condition = true;
      }
    });
    return condition;
  }

  getMappedValue(object): string {
    return object[Object.keys(object)[0]].value.toString();
  }
}
