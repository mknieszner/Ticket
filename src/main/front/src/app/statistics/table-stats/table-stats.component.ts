import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import * as fromAppReducers from '../../shared/store/app.reducers';
import {TableState} from "../../shared/store/table/tables.reducers";
import {Observable} from "rxjs/Observable";
import {RowContentModel, Status, TaskModel} from "../../shared/table.model";
import {UserModel} from "../../user/user.model";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-table-stats',
  templateUrl: './table-stats.component.html',
  styleUrls: ['./table-stats.component.css']
})
export class TableStatsComponent implements OnInit {
  tableState: Observable<TableState>;
  selectedTableName: Observable<string>;
  rowsInfo: {
    rows: RowContentModel[]
    doneRows: RowContentModel[];
    undoneRows: RowContentModel[];
  } = null;
  tasksInfo: {
    tasks: TaskModel[];
    unassignedTasks: TaskModel[];
    assignedTasks: TaskModel[];
    inProgressTasks: TaskModel[];
    doneTasks: TaskModel[];
  } = null;

  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.tableState = this.store.select('tables');
    this.selectedTableName = this.store.select('statistics', 'selectedTableName');
    this.selectedTableName.subscribe((tableName: string) => {
      this.dss.getTableRowsByName(tableName);
    });
    this.tableState.subscribe((tableState: TableState) => {
      if (tableState) {
        this.tasksInfo = mapToTaskInfo(tableState.tableContent)
        this.rowsInfo = mapToRowsInfo(tableState.tableContent);
      }
    })
  }
}


function mapToRowsInfo(rowList: RowContentModel[]): { rows, doneRows, undoneRows } {
  let rows: RowContentModel[] = [];
  let doneRows: RowContentModel[] = [];
  let undoneRows: RowContentModel[] = [];

  rowList.forEach((row: RowContentModel) => {
    rows.push(row);
    if (containsUndoneTasks(row)) {
      doneRows.push(row)
    } else {
      undoneRows.push(row);
    }
  });
  return {rows: rows, doneRows: doneRows, undoneRows: undoneRows}
}

function containsUndoneTasks(row: RowContentModel) {
  let rowStatus = true;
  row.taskDtos.forEach((task: TaskModel) => {
    if (task.status.toString() != 'DONE') {
      rowStatus = false;
    }
  });
  return rowStatus;
}

function mapToTaskInfo(rows: RowContentModel[]): { tasks, unassignedTasks, assignedTasks, inProgressTasks, doneTasks } {
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
  console.log({tasks: tasks, unassignedTasks: unassignedTasks, assignedTasks: assignedTasks, inProgressTasks: inProgressTasks, doneTasks: doneTasks})
  return {tasks: tasks, unassignedTasks: unassignedTasks, assignedTasks: assignedTasks, inProgressTasks: inProgressTasks, doneTasks: doneTasks};
}
