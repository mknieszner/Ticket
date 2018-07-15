import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {RowContentModel, TableDefinitionModel, TablesDetails, TaskModel} from './table.model';
import {Store} from '@ngrx/store';
import * as UsersActions from './store/user/users.actions';
import * as TablesActions from './store/table/tables.actions';
import * as fromAppReducers from './store/app.reducers';
import * as fromServerModel from './server.model';
import {UserModel} from '../user/user.model';
import {RoleModel} from '../roles/role.model';
import * as TaskActions from './store/task/tasks.actions';
import {Client} from 'stompjs/lib/stomp.js';
import {TaskInfoService} from './socket/task-info.service';
import * as ChatActions from './store/chat/chat.actions';
import {SnackBarService, SnackBarTheme} from "./snack-bar/snack-bar.service";

@Injectable()
export class DataStorageService {
  // stompClientState: Observable<Client>;
  // stompClient: Client;
  basehost = fromServerModel.baseUrl;


  constructor(private httpClient: HttpClient,
              private store: Store<fromAppReducers.AppState>,
              private taskInfoService: TaskInfoService,
              private snackBarService: SnackBarService) {
  }

  getCurrentUser(username: string) {
    this.httpClient.get<UserModel>(this.basehost + '/v1/users/' + username)
      .subscribe((user: UserModel) => {
        this.store.dispatch(new UsersActions.SetCurrntUserDetails(user));
      }, response => {
        this.snackBarService.showSnackBar(response.error.message);
      });
  }

  updateUser(user: UserModel) {
    this.httpClient.put<UserModel>(this.basehost + '/v1/users/' + user.username, user)
      .subscribe(
        (updatedUser: UserModel) => {
          this.store.dispatch(new UsersActions.SetCurrntUserDetails(updatedUser));
          this.snackBarService.showSnackBar('DONE!', SnackBarTheme.success);
        }, response => {
          this.snackBarService.showSnackBar(response.error.message);
        });
  }

  updatePassword(oldPassword, newPassword, username) {
    this.httpClient.put<boolean>(this.basehost + '/v1/users/' + username + '/pass', {
      oldPassword: oldPassword,
      newPassword: newPassword
    })
      .subscribe(
        (done: boolean) => {
          this.snackBarService.showSnackBar('DONE!', SnackBarTheme.success);
        }, response => {
          this.snackBarService.showSnackBar(response.error.message);
        }
      );
  }

  getActiveWsUsers() {
    this.httpClient.get<string[]>(this.basehost + '/v1/users/ws-active')
      .subscribe((activeUsers: string[]) => {
        console.log('activeUsers',activeUsers)
        this.store.dispatch(new ChatActions.SetActiveWsUsers(activeUsers));
      }, response => {
        this.snackBarService.showSnackBar(response.error.message);
      });
  }

  getTableHeaderBy(tableId: number) {
    return this.httpClient.get<TableDefinitionModel>(this.basehost + '/v1/projects/tables/' + tableId + '/definition')
      .subscribe((definition: TableDefinitionModel) => {
        this.store.dispatch(new TablesActions.SetTableDefinitionAction(definition));
      }, response => {
        this.snackBarService.showSnackBar(response.error.message);
      });
  }

  getTableRowsBy(tableId: number) {
    return this.httpClient.get<RowContentModel[]>(this.basehost + '/v1/projects/tables/' + tableId + '/rows')
      .subscribe((rows: RowContentModel[]) => {
        this.store.dispatch(new TablesActions.SetRowsAction(rows));
      }, response => {
        this.snackBarService.showSnackBar(response.error.message);
      });
  }

  getTablesDetails() {
    this.httpClient.get<TablesDetails[]>(this.basehost + '/v1/projects/tables/details')
      .subscribe(
        (names) => {
          console.log(names)
          this.store.dispatch(new TablesActions.SetNamesAction(names));
        }, response => {
          this.snackBarService.showSnackBar(response.error.message);
        }
      );
  }

  postTableDefinition(definition: TableDefinitionModel, databaseEnvironment) {
    this.httpClient.post(this.basehost + '/v1/projects/tables/definition/' + databaseEnvironment, definition)
      .subscribe(() => {
          this.snackBarService.showSnackBar("Done!", SnackBarTheme.success);
        }, response => {
          this.snackBarService.showSnackBar(response.error.message);
        }
      );
  }

  getUsers() {
    this.httpClient.get<UserModel[]>(this.basehost + '/v1/users')
      .subscribe((users: UserModel[]) => {
        this.store.dispatch(new UsersActions.SetUsersAction(users));
      }, response => {
        this.snackBarService.showSnackBar(response.error.message);
      });
  }

  getRoles() {
    this.httpClient.get<RoleModel[]>(this.basehost + '/v1/roles/details')
      .subscribe((roles: RoleModel[]) => {
        this.store.dispatch(new UsersActions.SetRolesAction(roles));
      }, response => {
        this.snackBarService.showSnackBar(response.error.message);
      });
  }

  addRoleToUser(data: { username: string, rolename: string }) {
    this.httpClient.post(this.basehost + '/v1/users/' + data.username + '/roles/' + data.rolename, null)
      .subscribe((user: UserModel) => {
        this.store.dispatch(new UsersActions.AddRoleToUser(user));
      }, response => {
        this.snackBarService.showSnackBar(response.error.message);
      });
  }

  removeRoleFromUser(data: { user: UserModel, rolename: string }) {
    this.httpClient.delete<boolean>(this.basehost + '/v1/users/' + data.user.username + '/roles/' + data.rolename)
      .subscribe((response) => {
        if (response) {
          data.user.roleNames.splice(data.user.roleNames.indexOf(data.rolename), 1);
          this.store.dispatch(new UsersActions.RemoveRoleFromUser(data.user));
        }
      }, response => {
        this.snackBarService.showSnackBar(response.error.message);
      });
  }

  removeUserFromRole(data: { role: RoleModel, username: string }) {
    this.httpClient.delete<boolean>(this.basehost + '/v1/roles/' + data.role.name + '/users/' + data.username)
      .subscribe((response) => {
        if (response) {
          let usertoRemove = null;
          data.role.userDtos.forEach(user => {
            if (user.username === data.username) {
              usertoRemove = user;
            }
          });
          data.role.userDtos.splice(data.role.userDtos.indexOf(usertoRemove), 1);
          this.store.dispatch(new UsersActions.RemoveUserFromRole(data.role));
        }
      }, response => {
        this.snackBarService.showSnackBar(response.error.message)
      });
  }

  addNewRow(tableId: number, newRow: RowContentModel) {
    this.httpClient.post<RowContentModel>(this.basehost + '/v1/projects/tables/' + tableId + '/row', newRow)
      .subscribe((savedRow: RowContentModel) => {
          // console.log('addNewRow dss OK: ', savedRow)
          this.store.dispatch(new TablesActions.AddRowAction(savedRow));
        },
        response => {
          this.snackBarService.showSnackBar(response.error.message);
        });
  }

  updateRow(tableId: number, updatedRow: RowContentModel) {
    this.httpClient.put<RowContentModel>(this.basehost + '/v1/projects/tables/' + tableId + '/row', updatedRow)
      .subscribe(
        (savedRow: RowContentModel) => {
          // console.log("updateRow dss OK: ", savedRow);
          this.store.dispatch(new TablesActions.UpdateRowAction(savedRow));
        }, response => {
          this.snackBarService.showSnackBar(response.error.message);
        }
      );
  }

  getCurrentUserRoles(username: string) {
    this.httpClient.get<string[]>(this.basehost + '/v1/roles/user/' + username)
      .subscribe((roles: string[]) => {
          this.store.dispatch(new UsersActions.SetCurrentUserRolenames(roles));
        },
        response => {
          this.snackBarService.showSnackBar(response.error.message);
        }
      );
  }

  saveNewRole(role: { name: string, description: string }) {
    this.httpClient.post<RoleModel>(this.basehost + '/v1/roles/' + role.name, role.description)
      .subscribe((savedRole: RoleModel) => {
          this.store.dispatch(new UsersActions.AddRoleAction(savedRole));
        },
        response => {
          this.snackBarService.showSnackBar(response.error.message);
        });
  }

  deleteUser(username: string): boolean | void {
    this.httpClient.delete<boolean>(this.basehost + '/v1/users/' + username)
      .subscribe((status: boolean) => {
          if (status) {
            this.store.dispatch(new UsersActions.DeleteUserAction(username));
            this.store.dispatch(new UsersActions.SetNewUserModeAction(false));
            this.store.dispatch(new UsersActions.SetUserDisplayedTask(null));
          }
          return true;
        },
        response => {
          this.snackBarService.showSnackBar(response.error.message);
        });
  }

  saveNewUser(user: UserModel) {
    this.httpClient.post<UserModel>(this.basehost + '/v1/users', user)
      .subscribe((savedUser: UserModel) => {
          console.log('saveNewUser dss OK: ', savedUser)
          this.store.dispatch(new UsersActions.AddUserAction(savedUser));
          this.store.dispatch(new UsersActions.SetNewUserModeAction(false));
        },
        response => {
          this.snackBarService.showSnackBar(response.error.message);
        });
  }

  saveNewTask(tableId: number, newTask: TaskModel, rowId: number) {
    this.httpClient.post<TaskModel>(this.basehost + '/v1/projects/tables/' + tableId + '/rows/' + rowId + '/tasks', newTask)
      .subscribe((task: TaskModel) => {
          this.store.dispatch(new TablesActions.AddTaskAction({task: task, rowId: rowId}));
        },
        response => {
          this.snackBarService.showSnackBar(response.error.message);
        });
  }

  setTableUsers(tableId: number) {
    // console.log(tableName);
    this.httpClient.get<UserModel[]>(this.basehost + '/v1/users/table/' + tableId)
      .subscribe((users: UserModel[]) => {
          this.store.dispatch(new TablesActions.SetTableUsers(users));
        },
        response => {
          this.snackBarService.showSnackBar(response.error.message);
        }
      );
  }

  onAssignUserToTask(tableId: number, rowId: number, taskId: number, username: string) {
    this.httpClient.post<TaskModel>(this.basehost + '/v1/projects/tables/' + tableId + '/rows/tasks/' + taskId, username)
      .subscribe((task: TaskModel) => {
          this.store.dispatch(new TablesActions.UpdateRowsTaskAction({rowId: rowId, task: task}));
          this.taskInfoService.stompClient.send('/app/newTasks/' + username, {});
        },
        response => {
          this.snackBarService.showSnackBar(response.error.message);
        });
  }

  onRemoveUserFromTask(tableId: number, rowId: number, taskId: number, username: string) {
    this.httpClient.delete<TaskModel>(this.basehost + '/v1/projects/tables/' + tableId + '/rows/tasks/' + taskId + '/user/' + username)
      .subscribe((task: TaskModel) => {
          // console.log('onRemoveUserFromTask dss OK: ', task)
          this.store.dispatch(new TablesActions.UpdateRowsTaskAction({rowId: rowId, task: task}));
          this.taskInfoService.stompClient.send('/app/newTasks/' + username, {});
        },
        response => {
          this.snackBarService.showSnackBar(response.error.message);
        });
  }

  updateTask(task: TaskModel) {
    this.httpClient.put<TaskModel>(this.basehost + '/v1/projects/tables/' + task.tableId + '/rows/tasks', task)
      .subscribe(
        (updatedTask: TaskModel) => {
          console.log('updateTask dss OK: ', updatedTask);
          this.store.dispatch(new TablesActions.UpdateTaskAction(updatedTask));
          this.store.dispatch(new UsersActions.UpdateTaskAction(updatedTask));
        }, response => {
          this.snackBarService.showSnackBar(response.error.message);
        }
      );
  }

  deleteTask(tableId: number, taskId: number, rowId: number) {
    this.httpClient.delete<boolean>(this.basehost + '/v1/projects/tables/' + tableId + '/rows/tasks/' + taskId)
      .subscribe((response) => {
        if (response) {
          this.store.dispatch(new TaskActions.OnDeleteTask(taskId));
          this.store.dispatch(new TablesActions.DeleteTask({rowId: rowId, taskId: taskId}));
        }
      }, response => {
        this.snackBarService.showSnackBar(response.error.message);
      });
  }

  deleteRow(tableId: number, rowId: number) {
    this.httpClient.delete<boolean>(this.basehost + '/v1/projects/tables/' + tableId + '/rows/' + rowId)
      .subscribe((response) => {
        if (response) {
          this.store.dispatch(new TablesActions.DeleteRow(rowId));
        }
      }, response => {
        this.snackBarService.showSnackBar(response.error.message);
      });
  }

  deleteRole(roleName: string) {
    this.httpClient.delete<boolean>(this.basehost + '/v1/roles/' + roleName)
      .subscribe((status: boolean) => {
          if (status) {
            this.store.dispatch(new UsersActions.DeleteRoleAction(roleName));
          }
        },
        response => {
          this.snackBarService.showSnackBar(response.error.message);
        });
  }
}
