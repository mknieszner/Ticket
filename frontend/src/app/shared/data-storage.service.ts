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

@Injectable()
export class DataStorageService {
  // stompClientState: Observable<Client>;
  // stompClient: Client;
  basehost = fromServerModel.baseUrl;

  constructor(private httpClient: HttpClient,
              private store: Store<fromAppReducers.AppState>,
              private taskInfoService: TaskInfoService) {
  }

  getCurrentUser(username: string) {
    this.httpClient.get<UserModel>(this.basehost + '/v1/users/' + username)
      .subscribe((user: UserModel) => {
        this.store.dispatch(new UsersActions.SetCurrntUserDetails(user));
      }, (err) => {
        console.log('getCurrentUser dss err: ', err);
      });
  }

  updateUser(user: UserModel) {
    this.httpClient.put<UserModel>(this.basehost + '/v1/users/' + user.username, user)
      .subscribe(
        (updatedUser: UserModel) => {
          console.log('updateUser dss OK: ', updatedUser);
          this.store.dispatch(new UsersActions.SetCurrntUserDetails(updatedUser));
        }, err => {
          console.log('updateUser dss ERR: ', err);
        }
      );
  }

  updatePassword(oldPassword, newPassword, username) {
    this.httpClient.put<boolean>(this.basehost + '/v1/users/' + username + '/pass', {
      oldPassword: oldPassword,
      newPassword: newPassword
    })
      .subscribe(
        (done: boolean) => {
          console.log('updatePassword dss OK: ', done);
        }, err => {
          console.log('updatePassword dss ERR: ', err);
        }
      );
  }

  getActiveWsUsers() {
    this.httpClient.get<string[]>(this.basehost + '/v1/users/ws-active')
      .subscribe((activeUsers: string[]) => {
        this.store.dispatch(new ChatActions.SetActiveWsUsers(activeUsers));
      }, (err) => {
        console.log('getActiveWsUsers dss err: ', err);
      });
  }

  getTableHeaderBy(tableId: number) {
    return this.httpClient.get<TableDefinitionModel>(this.basehost + '/v1/projects/tables/' + tableId + '/definition')
      .subscribe((definition: TableDefinitionModel) => {
        this.store.dispatch(new TablesActions.SetTableDefinitionAction(definition));
      }, (err) => {
        console.log('getTableHeaderByName dss err: ', err);
      });
  }

  getTableRowsBy(tableId: number) {
    return this.httpClient.get<RowContentModel[]>(this.basehost + '/v1/projects/tables/' + tableId + '/rows')
      .subscribe((rows: RowContentModel[]) => {
        this.store.dispatch(new TablesActions.SetRowsAction(rows));
      }, (err) => {
        console.log('getTableRowsByName dss err: ', err);
      });
  }

  getTablesDetails() {
    this.httpClient.get<TablesDetails[]>(this.basehost + '/v1/projects/tables/details')
      .subscribe(
        (names) => {
          this.store.dispatch(new TablesActions.SetNamesAction(names));
        }, (err) => {
          console.log('getTableNames dss err: ', err);
        }
      );
  }

  postTableDefinition(definition: TableDefinitionModel, databaseEnvironment) {
    this.httpClient.post(this.basehost + '/v1/projects/tables/definition/' + databaseEnvironment, definition)
      .subscribe(() => {
          //TODO komunikat
          alert("DONE!");
        }, (err) => {
          console.log('postTableDefinition dss err: ', err);
        }
      );
  }

  getUsers() {
    this.httpClient.get<UserModel[]>(this.basehost + '/v1/users')
      .subscribe((users: UserModel[]) => {
        this.store.dispatch(new UsersActions.SetUsersAction(users));
      }, (err) => {
        console.log('getUsers dss err: ', err);
      });
  }

  getRoles() {
    this.httpClient.get<RoleModel[]>(this.basehost + '/v1/roles/details')
      .subscribe((roles: RoleModel[]) => {
        this.store.dispatch(new UsersActions.SetRolesAction(roles));
      }, (err) => {
        console.log('getRoles dss err: ', err);
      });
  }

  addRoleToUser(data: { username: string, rolename: string }) {
    return this.httpClient.post(this.basehost + '/v1/users/' + data.username + '/roles/' + data.rolename, null)
      .subscribe((user: UserModel) => {
        this.store.dispatch(new UsersActions.AddRoleToUser(user));
        return true;
      }, (err) => {
        console.log('addRoleToUser dss err: ', err);
      });
  }

  removeRoleFromUser(data: { user: UserModel, rolename: string }) {
    this.httpClient.delete<boolean>(this.basehost + '/v1/users/' + data.user.username + '/roles/' + data.rolename)
      .subscribe((response) => {
        if (response) {
          data.user.roleNames.splice(data.user.roleNames.indexOf(data.rolename), 1);
          this.store.dispatch(new UsersActions.RemoveRoleFromUser(data.user));
        }
      }, (err) => {
        console.log('removeRoleFromUser dss err: ', err);
      });
  }

  // addUserToRole(data: { rolename: string, username: string }) { TODO addUserToRole
  //   return this.httpClient.post(this.basehost + '/v1/roles/' + data.rolename + '/users/' + data.username, null)
  //     .subscribe((role: RoleModel) => {
  //       this.store.dispatch(new UsersActions.AddUserToRole(role));
  //       return true;
  //     }, (err) => {
  //       console.log('addUserToRole dss err: ', err);
  //     });
  // }

  removeUserFromRole(data: { role: RoleModel, username: string }) { // TODO removeUserFromRole ERR!!
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
      });
  }

  addNewRow(tableId: number, newRow: RowContentModel) {
    this.httpClient.post<RowContentModel>(this.basehost + '/v1/projects/tables/' + tableId + '/row', newRow)
      .subscribe((savedRow: RowContentModel) => {
          // console.log('addNewRow dss OK: ', savedRow)
          this.store.dispatch(new TablesActions.AddRowAction(savedRow));
        },
        err => {
          console.log('addNewRow dss err: ', err);
        });
  }

  updateRow(tableId: number, updatedRow: RowContentModel) {
    this.httpClient.put<RowContentModel>(this.basehost + '/v1/projects/tables/' + tableId + '/row', updatedRow)
      .subscribe(
        (savedRow: RowContentModel) => {
          // console.log("updateRow dss OK: ", savedRow);
          this.store.dispatch(new TablesActions.UpdateRowAction(savedRow));
        }, err => {
          console.log('updateRow dss ERR: ', err);
        }
      );
  }

  getCurrentUserRoles(username: string) {
    this.httpClient.get<string[]>(this.basehost + '/v1/roles/user/' + username)
      .subscribe((roles: string[]) => {
          this.store.dispatch(new UsersActions.SetCurrentUserRolenames(roles));
        },
        (err) => {
          console.log('getUserRoles dss ERR: ', err);
        }
      );
  }

  saveNewRole(role: { name: string, description: string }) {
    this.httpClient.post<RoleModel>(this.basehost + '/v1/roles/' + role.name, role.description)
      .subscribe((savedRole: RoleModel) => {
          // console.log('saveNewRole dss OK: ', savedRole)
          this.store.dispatch(new UsersActions.AddRoleAction(savedRole));
        },
        err => {
          console.log('saveNewRole dss err: ', err);
        });
  }

  // deleteRole(roleName: string) { todo remove?
  //   this.httpClient.delete<boolean>(this.basehost + '/v1/roles/' + roleName)
  //     .subscribe((status: boolean) => {
  //         if (status) {
  //           this.store.dispatch(new UsersActions.DeleteRoleAction(roleName));
  //         }
  //       },
  //       err => {
  //         console.log('deleteRole dss err: ', err);
  //       });
  // }

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
        err => {
          console.log('deleteUser dss err: ', err);
        });
  }

  saveNewUser(user: UserModel) {
    this.httpClient.post<UserModel>(this.basehost + '/v1/users', user)
      .subscribe((savedUser: UserModel) => {
          console.log('saveNewUser dss OK: ', savedUser)
          this.store.dispatch(new UsersActions.AddUserAction(savedUser));
          this.store.dispatch(new UsersActions.SetNewUserModeAction(false));
        },
        err => {
          console.log('saveNewUser dss err: ', err);
        });
  }

  saveNewTask(tableId: number, newTask: TaskModel, rowId: number) {
    this.httpClient.post<TaskModel>(this.basehost + '/v1/projects/tables/' + tableId + '/rows/' + rowId + '/tasks', newTask)
      .subscribe((task: TaskModel) => {
          this.store.dispatch(new TablesActions.AddTaskAction({task: task, rowId: rowId}));
        },
        err => {
          console.log('saveNewTask dss err: ', err);
        });
  }

  setTableUsers(tableId: number) {
    // console.log(tableName);
    this.httpClient.get<UserModel[]>(this.basehost + '/v1/users/table/' + tableId)
      .subscribe((users: UserModel[]) => {
          this.store.dispatch(new TablesActions.SetTableUsers(users));
        },
        (err) => {
          console.log('setTableUsers dss ERR: ', err);
        }
      );
  }

  onAssignUserToTask(tableId: number, rowId: number, taskId: number, username: string) {
    this.httpClient.post<TaskModel>(this.basehost + '/v1/projects/tables/' + tableId + '/rows/tasks/' + taskId, username)
      .subscribe((task: TaskModel) => {
          this.store.dispatch(new TablesActions.UpdateRowsTaskAction({rowId: rowId, task: task}));
          this.taskInfoService.stompClient.send('/app/newTasks/' + username, {});
        },
        err => {
          console.log('onAssignUserToTask dss err: ', err);
        });
  }

  onRemoveUserFromTask(tableId: number, rowId: number, taskId: number, username: string) {
    this.httpClient.delete<TaskModel>(this.basehost + '/v1/projects/tables/' + tableId + '/rows/tasks/' + taskId + '/user/' + username)
      .subscribe((task: TaskModel) => {
          // console.log('onRemoveUserFromTask dss OK: ', task)
          this.store.dispatch(new TablesActions.UpdateRowsTaskAction({rowId: rowId, task: task}));
          this.taskInfoService.stompClient.send('/app/newTasks/' + username, {});
        },
        err => {
          console.log('onRemoveUserFromTask dss err: ', err);
        });
  }

  updateTask(task: TaskModel) {
    this.httpClient.put<TaskModel>(this.basehost + '/v1/projects/tables/' +task.tableId+ '/rows/tasks', task)
      .subscribe(
        (updatedTask: TaskModel) => {
          console.log('updateTask dss OK: ', updatedTask);
          this.store.dispatch(new TablesActions.UpdateTaskAction(updatedTask));
          this.store.dispatch(new UsersActions.UpdateTaskAction(updatedTask));
        }, err => {
          console.log('updateTask dss ERR: ', err);
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
      }, err => {
        console.log('deleteTask dss err: ', err);
      });
  }

  deleteRow(tableId: number, rowId: number) {
    this.httpClient.delete<boolean>(this.basehost + '/v1/projects/tables/' + tableId + '/rows/' + rowId)
      .subscribe((response) => {
        if (response) {
          this.store.dispatch(new TablesActions.DeleteRow(rowId));
        }
      }, err => {
        console.log('deleteRow dss err: ', err);
      });
  }
}
