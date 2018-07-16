import {Component, OnInit} from '@angular/core';
import {RowContentModel, Status, TableDefinitionModel, TaskModel} from '../../shared/table.model';
import {Store} from '@ngrx/store';
import * as fromAppReducers from '../../shared/store/app.reducers';
import * as TaskActions from '../../shared/store/task/tasks.actions';
import {Observable} from 'rxjs/Observable';
import {DataStorageService} from '../../shared/data-storage.service';
import {UserModel} from '../../user/user.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  showedTask: Observable<TaskModel>;
  task: TaskModel;
  // showedInnerTask: Observable<TaskModel>;
  status = Status;
  editedRow: Observable<RowContentModel>;
  row: RowContentModel;
  tableUsers: Observable<UserModel[]>;
  tableDefinition: TableDefinitionModel;


  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) { }


  ngOnInit() {
    this.showedTask = this.store.select('tasks', 'showedTask');
    this.showedTask.forEach((task) => {
      this.task = task;
    });
    this.editedRow = this.store.select('tables', 'editedRow');
    this.editedRow.forEach((row: RowContentModel) => {
      this.row = row;
    });
    this.store.select('tables', 'tableDefinition').subscribe((tableDefinition: TableDefinitionModel) => {
      if (tableDefinition) { // TODO: ???
        this.tableDefinition = tableDefinition[0];
        this.dss.setTableUsers(this.tableDefinition.id);
      }
    });
    this.tableUsers = this.store.select('tables', 'tableUsers');
  }

  onHideTaskDetails() {
    this.store.dispatch(new TaskActions.SetTaskDetailsModeAction(false));
    this.store.dispatch(new TaskActions.SetShowedTaskAction(null));
  }

  onSaveRowNewTask(newTaskDetails: { name: string, description: string, status: Status }) {
    const task: TaskModel = {
      id: null,
      tableId: this.tableDefinition.id,
      name: newTaskDetails.name,
      description: newTaskDetails.description,
      status: newTaskDetails.status,
      userNames: [],
      taskDtos: []
    };
    this.dss.saveNewTask(this.tableDefinition.id, task, this.row.id);
  }

  onAssignUserToTask(username: string ) {
    this.dss.onAssignUserToTask(this.tableDefinition.id, this.row.id, this.task.id , username);
  }

  onRemoveUserFromTask(username: string) {
    this.dss.onRemoveUserFromTask(this.tableDefinition.id, this.row.id, this.task.id , username);
  }
}
