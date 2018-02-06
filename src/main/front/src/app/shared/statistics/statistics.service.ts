import {RowContentModel, TaskModel} from "../table.model";
import {
  ColumnInfoModel, DescriptionInfoModel, EnumInfoModel, NumberInfoModel, ShortTextInfoModel,
  TableInfoModel
} from "./table-info.model";

export class StatisticsService {
  mapToRowsInfo(rowList: RowContentModel[]) : TableInfoModel {
    let rows: RowContentModel[] = [];
    let doneRows: RowContentModel[] = [];
    let undoneRows: RowContentModel[] = [];
    let columnInfo: ColumnInfoModel = {
      numberInfo: [],
      enumInfo: [],
      dateInfo: [],
      shortTextInfo: [],
      descriptionInfo: []
    };
    let numberInfoIndex: number = 0;
    let enumInfoIndex: number = 0;
    let dateInfoIndex: number = 0;
    let shortTextIndex: number = 0;
    let descriptionInfoIndex: number = 0;

    rowList.forEach((row: RowContentModel, i) => {
      rows.push(row);
      if (this.containsUndoneTasks(row)) {
        doneRows.push(row)
      } else {
        undoneRows.push(row);
      }
      row.columnValueDtos.forEach((value, j) => {// TODO ZASTĄPIć J ARRAY_LENGTH+1  => USUNAC CLEAN ARRAY
        switch (Object.keys(value)[0]) {
          case 'IN': //TODO if index==0 podstaw do obu (min i max) i zamien <=, >= na <,>
            if (typeof columnInfo.numberInfo[j] == "undefined") {
              columnInfo.numberInfo[j] = {columnNumber: j, sum: 0, avg: 0, min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY};
            }
            columnInfo.numberInfo[j].sum += parseFloat(value[Object.keys(value)[0]].value);
            columnInfo.numberInfo[j].avg += parseFloat(value[Object.keys(value)[0]].value);
            if (columnInfo.numberInfo[j].min >= parseFloat(value[Object.keys(value)[0]].value)) {
              columnInfo.numberInfo[j].min = parseFloat(value[Object.keys(value)[0]].value);
            }
            if (columnInfo.numberInfo[j].max <= parseFloat(value[Object.keys(value)[0]].value)) {
              columnInfo.numberInfo[j].max = parseFloat(value[Object.keys(value)[0]].value);
            }
            numberInfoIndex++;
            return;

          case 'EN':
            if (typeof columnInfo.enumInfo[j] == "undefined") {
              columnInfo.enumInfo[j] = [];
            }
            let exist = false;

            columnInfo.enumInfo[j].forEach((columnStats: EnumInfoModel, i) => {
              if (columnStats.name == value[Object.keys(value)[0]].value) {
                columnInfo.enumInfo[j][i].sum++;
                exist = true;
              }
            });

            if (!exist) {
              columnInfo.enumInfo[j][i] = {columnNumber: j, name: value[Object.keys(value)[0]].value, sum: 1,}
            }

            enumInfoIndex++;
            return;

          case 'DT':
            if (typeof columnInfo.dateInfo[j] == "undefined") {
              columnInfo.dateInfo[j] = {columnNumber: j, min: Date.parse('1/1/2100'), max: Date.parse('1/01/1970')};
            }

            if (columnInfo.dateInfo[j].min >= Date.parse(value[Object.keys(value)[0]].value)) {
              columnInfo.dateInfo[j].min = Date.parse(value[Object.keys(value)[0]].value)
            }

            if (columnInfo.dateInfo[j].max <= Date.parse(value[Object.keys(value)[0]].value)) {
              columnInfo.dateInfo[j].max = Date.parse(value[Object.keys(value)[0]].value)
            }
            dateInfoIndex++;
            return;

          case 'ST':
            if (typeof columnInfo.shortTextInfo[j] == "undefined") {
              columnInfo.shortTextInfo[j] = {columnNumber: j, avgLength: 0};
            }

            columnInfo.shortTextInfo[j].avgLength += value[Object.keys(value)[0]].value.length;
            shortTextIndex++;
            return;

          case 'DE':
            if (typeof columnInfo.descriptionInfo[j] == "undefined") {
              columnInfo.descriptionInfo[j] = {columnNumber: j, avgLength: 0};
            }
            columnInfo.descriptionInfo[j].avgLength += value[Object.keys(value)[0]].value.length;
            descriptionInfoIndex++;
            return;
        }
      })
    });

    columnInfo.numberInfo.forEach((value: NumberInfoModel,i) => {
      columnInfo.numberInfo[i]['avg'] = value.avg / rows.length;
    });

    columnInfo.shortTextInfo.forEach((value: ShortTextInfoModel,i) => {
      columnInfo.shortTextInfo[i].avgLength = value.avgLength / rows.length;
    });

    columnInfo.descriptionInfo.forEach((value: DescriptionInfoModel,i) => {
      columnInfo.descriptionInfo[i].avgLength = value.avgLength / rows.length;
    });

    return {rows: rows, doneRows: doneRows, undoneRows: undoneRows, columnInfo: this.cleanColumnInfo(columnInfo)}
  }

  cleanColumnInfo(columnInfo):ColumnInfoModel {
    let cleanColumnInfo: ColumnInfoModel = {
      dateInfo: [],
      shortTextInfo: [],
      enumInfo: [],
      numberInfo: [],
      descriptionInfo: []
    };
    cleanColumnInfo.dateInfo = this.cleanArray(columnInfo.dateInfo);
    cleanColumnInfo.shortTextInfo = this.cleanArray(columnInfo.shortTextInfo);
    cleanColumnInfo.enumInfo = this.cleanArray(columnInfo.enumInfo);
    cleanColumnInfo.numberInfo = this.cleanArray(columnInfo.numberInfo);
    cleanColumnInfo.descriptionInfo = this.cleanArray(columnInfo.descriptionInfo);
    return cleanColumnInfo;
  }

  cleanArray(actual) {
    let newArray = [];
    for (let i = 0; i < actual.length; i++) {
      if (typeof actual[i] != "undefined") {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  }


  containsUndoneTasks(row: RowContentModel) {
    let rowStatus = true;
    row.taskDtos.forEach((task: TaskModel) => {
      if (task.status.toString() != 'DONE') {
        rowStatus = false;
      }
    });
    return rowStatus;
  }

  mapToTaskInfo(rows: RowContentModel[]): { tasks, unassignedTasks, assignedTasks, inProgressTasks, doneTasks } {
    let tasks: TaskModel[] = [];
    let unassignedTasks: TaskModel[] = [];
    let assignedTasks: TaskModel[] = [];
    let inProgressTasks: TaskModel[] = [];
    let doneTasks: TaskModel[] = [];

    rows.forEach((row) => {
      row.taskDtos.forEach((task: TaskModel) => {
        switch (task.status.toString()) {
          case ('UNASSIGNED'):
            tasks.push(task);
            unassignedTasks.push(task);
            return;
          case ('ASSIGNED'):
            tasks.push(task);
            assignedTasks.push(task);
            return;
          case ('IN_PROGRESS'):
            tasks.push(task);
            inProgressTasks.push(task);
            return;
          case ('DONE'):
            tasks.push(task);
            doneTasks.push(task);
            return;
          default:
            throw new Error('Unknown task status: ' + task.status.toString());
        }
      })
    });
    return {tasks: tasks, unassignedTasks: unassignedTasks, assignedTasks: assignedTasks, inProgressTasks: inProgressTasks, doneTasks: doneTasks};
  }

}
