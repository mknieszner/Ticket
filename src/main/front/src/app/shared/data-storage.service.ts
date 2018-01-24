import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {RowContentModel, TableDefinitionModel} from "./row.model";
import {Store} from "@ngrx/store";
import * as UsersActions from "./store/user/users.actions";
import * as TablesActions from "./store/table/tables.actions";
import * as fromAppReducers from './store/app.reducers'
import * as fromServerModel from './server.model'
import {UserModel} from "../user/user.model";
import {RoleModel} from "../roles/role.model";
import {FormControl} from "@angular/forms";
import {OauthService} from "./oauth.service";

@Injectable()
export class DataStorageService {
  basehost = fromServerModel.baseUrl;

  constructor(private httpClient: HttpClient,
              private store: Store<fromAppReducers.AppState>,
              private oauth: OauthService) {
  }

  getTableHeaderByName(tableName: string) {
    return this.httpClient.get<TableDefinitionModel>(this.basehost + '/v1/projects/tables/definition/' + tableName)
      .map((definition) => {
        return definition;
      }).subscribe((definition: TableDefinitionModel) => {
        this.store.dispatch(new TablesActions.SetTableDefinitionAction(definition))
      })
  }

  getTableRowsByName(tableName: string) {
    return this.httpClient.get<RowContentModel[]>(this.basehost + '/v1/projects/tables/' + tableName + '/rows')
      .subscribe((rows: RowContentModel[]) => {
        this.store.dispatch(new TablesActions.SetRowsAction(rows))
      })
  }

  getTableNames() {
    // this.oauth.getResource(this.basehost +'/v1/projects/tables/names').subscribe(names =>{ //rozwiązanie bez interceptora (http/httpClient)
    //    console.log(names);
    //    this.store.dispatch(new TablesActions.SetNamesAction(names))});

    this.httpClient.get<string[]>(this.basehost + '/v1/projects/tables/names')
      .subscribe(
        (names) => {
          this.store.dispatch(new TablesActions.SetNamesAction(names))
        }
      );
  }

  postTableDefinition(definition: TableDefinitionModel) {
    this.httpClient.post(this.basehost + '/v1/projects/tables/definition', definition)
      .subscribe(

      );
  }

  getUsers() {
    this.httpClient.get<UserModel[]>(this.basehost + '/v1/users')
      .subscribe((users: UserModel[]) => {
        this.store.dispatch(new UsersActions.SetUsersAction(users));
      });
  }

  getRoles() {
    this.httpClient.get<RoleModel[]>(this.basehost + '/v1/roles/details')
      .subscribe((roles: RoleModel[]) => {
        this.store.dispatch(new UsersActions.SetRolesAction(roles));
      });
  }

  addRoleToUser(data: { username: string, rolename: string }) {
    return this.httpClient.post(this.basehost + '/v1/users/' + data.username + '/roles/' + data.rolename, null)
      .subscribe((user: UserModel) => {
        this.store.dispatch(new UsersActions.AddRoleToUser(user));
        return true;
      });
  }

  removeRoleFromUser(data: { user: UserModel, rolename: string }) {
    this.httpClient.delete<boolean>(this.basehost + '/v1/users/' + data.user.username + '/roles/' + data.rolename)
      .subscribe((response) => {
        if (response) {
          data.user.roleNames.splice(data.user.roleNames.indexOf(data.rolename), 1);
          this.store.dispatch(new UsersActions.RemoveRoleFromUser(data.user));
        }
      });
  }

  addUserToRole(data: { rolename: string, username: string }) {
    return this.httpClient.post(this.basehost + '/v1/roles/' + data.rolename + '/users/' + data.username, null)
      .subscribe((role: RoleModel) => {
        this.store.dispatch(new UsersActions.AddUserToRole(role));
        return true;
      });
  }

  removeUserFromRole(data: { role: RoleModel, username: string }) {
    this.httpClient.delete<boolean>(this.basehost + '/v1/roles/' + data.role.name + '/users/' + data.username)
      .subscribe((response) => {
        if (response) {
          let usertoRemove
          data.role.userDtos.forEach(user => {
            if (user.username == data.username) {
              usertoRemove = user;
            }
          });
          data.role.userDtos.splice(data.role.userDtos.indexOf(usertoRemove), 1);
          this.store.dispatch(new UsersActions.RemoveUserFromRole(data.role));
        }
      });
  }

  addNewRow(tableName: string, newRow: RowContentModel) {
    console.log(this.httpClient.post<RowContentModel>(this.basehost + '/v1/projects/tables/' + tableName + '/row', newRow)
      .subscribe((savedRow: RowContentModel) => {
          console.log('addNewRow dss OK: ', savedRow)
          this.store.dispatch(new TablesActions.AddRowAction(savedRow));
        },
        err => {
          console.log('addNewRow dss err: ', err)
        }));
  }

  updateRow(tableName: string, updatedRow: RowContentModel) {
    console.log(this.httpClient.put<RowContentModel>(this.basehost + '/v1/projects/tables/' + tableName + '/row', updatedRow)
      .subscribe(
        (savedRow: RowContentModel) => {
          console.log("updateRow dss OK: ", savedRow);
          this.store.dispatch(new TablesActions.UpdateRowAction(savedRow));
        }, err => {
          console.log("updateRow dss ERR: ", err)
        })
    );
  }

  getCurrentUserRoles(username: string) {
    this.httpClient.get<string[]>(this.basehost + '/v1/roles/user/' + username)
      .subscribe((roles: string[]) => {
          this.store.dispatch(new UsersActions.SetCurrentUserRolenames(roles));
        },
        (err) => {
          console.log(err => {
            console.log('getUserRoles dss ERR: ', err)
          })
        });
  }

  saveNewRole(role: { name: string, description: string }) {
    console.log(this.httpClient.post<RoleModel>(this.basehost + '/v1/roles/' + role.name, role.description)
      .subscribe((savedRole: RoleModel) => {
          console.log('saveNewRole dss OK: ', savedRole)
          this.store.dispatch(new UsersActions.AddRoleAction(savedRole));
        },
        err => {
          console.log('saveNewRole dss err: ', err)
        }));
  }

  deleteRole(roleName: string) {
    console.log(this.httpClient.delete<boolean>(this.basehost + '/v1/roles/' + roleName)
      .subscribe((status: boolean) => {
          console.log('deleteRole dss OK: ', status)
          if (status) {
            this.store.dispatch(new UsersActions.DeleteRoleAction(roleName));
          }
        },
        err => {
          console.log('deleteRole dss err: ', err)
        }));
  }

  deleteUser(username: string) {
    console.log(this.httpClient.delete<boolean>(this.basehost + '/v1/users/' + username)
      .subscribe((status: boolean) => {
          console.log('deleteUser dss OK: ', status)
          if (status) {
            this.store.dispatch(new UsersActions.DeleteUserAction(username));
          }
        },
        err => {
          console.log('deleteUser dss err: ', err)
        }));
  }

  saveNewUser(user: UserModel) {
    console.log(this.httpClient.post<UserModel>(this.basehost + '/v1/users',user)
      .subscribe((savedUser: UserModel) => {
          console.log('saveNewUser dss OK: ', savedUser)
          this.store.dispatch(new UsersActions.AddUserAction(savedUser));
        },
        err => {
          console.log('saveNewUser dss err: ', err)
        }));
  }
}
