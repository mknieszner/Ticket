import {Component, Input, OnInit} from '@angular/core';
import {RowContentModel, Status, TableDefinitionModel, TaskModel} from "../../shared/table.model";
import {Store} from "@ngrx/store";
import * as fromAppReducers from '../../shared/store/app.reducers';
import * as TaskActions from "../../shared/store/task/tasks.actions";
import {Observable} from "rxjs/Observable";
import {DataStorageService} from "../../shared/data-storage.service";
import {UserModel} from "../../user/user.model";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  // @Input() task: TaskModel;
  showedTask: Observable<TaskModel>;
  task: TaskModel;
  showedInnerTask: Observable<TaskModel>
  status = Status;
  editedRow: Observable<RowContentModel>;
  row: RowContentModel;
  tableUsers: Observable<UserModel[]>;
  tableDefinition: Observable<TableDefinitionModel>;
  tableName: string;


  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) { }


  ngOnInit() {
    this.showedTask = this.store.select('tasks', 'showedTask');
    this.showedTask.forEach((task)=>{
      this.task = task;
    });
    this.editedRow = this.store.select('tables', 'editedRow');
    this.editedRow.forEach((row:RowContentModel) => {
      this.row = row;
    });
    this.tableDefinition = this.store.select('tables','tableDefinition');
    this.tableDefinition.subscribe((tableDefinition: TableDefinitionModel) => {
      // console.log( 'setTableUsers');
      // console.log(tableDefinition);

      if(tableDefinition) { //TODO: ???
        this.tableName = tableDefinition[0].name;
        this.dss.setTableUsers(this.tableName)
      }
    });
    this.tableUsers = this.store.select('tables','tableUsers');
  }

  onHideTaskDetails() {
    this.store.dispatch(new TaskActions.SetTaskDetailsModeAction(false));
    this.store.dispatch(new TaskActions.SetShowedTaskAction(null));
  }

  onSaveRowNewTask(newTaskDetails: { name: string, description: string, status: Status }) {
    const task: TaskModel = {
      id: null,
      name: newTaskDetails.name,
      description: newTaskDetails.description,
      status: newTaskDetails.status,
      userNames: [],
      taskDtos: []
    };
    this.dss.saveNewTask(task, this.row.id);
  }

  onAssignUserToTask(username: string ) {
    console.log('onAssignUserToTask username >' + username + '<');
    this.dss.onAssignUserToTask(this.row.id, this.task.id ,username)
  }

  onRemoveUserFromTask(username: string) {
    alert('TODO onRemoveUserFromTask');
  }
}
