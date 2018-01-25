import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import * as fromAppReducers from '../../../shared/store/app.reducers';
import * as TaskActions from "../../../shared/store/task/tasks.actions";
import {TableDefinitionModel, TaskModel} from "../../../shared/table.model";
import {UserModel} from "../../../user/user.model";
import * as TableActions from "../../../shared/store/table/tables.actions";
import {DataStorageService} from "../../../shared/data-storage.service";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() task: TaskModel;
  tableUsers: Observable<UserModel[]>;
  tableDefinition: Observable<TableDefinitionModel>;
  tableName: string;


  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) { }

  ngOnInit() {
    // this.tableDefinition = this.store.select('tables','tableDefinition');
    // this.tableDefinition.forEach((tableDefinition: TableDefinitionModel) => {
    //   this.tableName = tableDefinition.name;
    //   this.dss.setTableUsers(this.tableName)
    // });
    // this.tableUsers = this.store.select('tables','tableUsers');
  }

  onShowTaskDetails(taskId: Number) {
    this.store.dispatch(new TaskActions.SetTaskDetailsModeAction(true));
    this.store.dispatch(new TaskActions.SetShowedTaskAction(this.task));
  }

  hideTaskDetails() {
    this.store.dispatch(new TaskActions.SetTaskDetailsModeAction(false));
    this.store.dispatch(new TaskActions.SetShowedTaskAction(null));
  }
}
