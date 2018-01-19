import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {RowContentModel, TableDefinitionModel} from "./row.model";
import {Store} from "@ngrx/store";
import * as TablesActions from "./store/tables.actions";
import * as fromTableReducers from './store/tables.reducers'
import * as fromServerModel from './server.model'
import {UserModel} from "../user/user.model";
import {RoleModel} from "../roles/role.model";
import {FormControl} from "@angular/forms";
import {OauthService} from "./oauth.service";

@Injectable()
export class DataStorageService {
  basehost = fromServerModel.baseUrl;

  constructor(private httpClient: HttpClient,
              private store: Store<fromTableReducers.AppState>,
              private oauth: OauthService) {
  }

  getTableHeaderByName(tableName: string) {
    return this.httpClient.get<TableDefinitionModel>(this.basehost+'/v1/projects/tables/definition/' + tableName)
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

    this.httpClient.get<string[]>(this.basehost +'/v1/projects/tables/names')
      .subscribe(
        (names) => {
          this.store.dispatch(new TablesActions.SetNamesAction(names))
        }
      );
  }

  postTableDefinition(definition: TableDefinitionModel) {
    this.httpClient.post(this.basehost +'/v1/projects/tables/definition', definition)
      .subscribe(

      );
  }

  getUsers() {
    this.httpClient.get<UserModel[]>(this.basehost +'/v1/users')
      .subscribe((users: UserModel[]) => {
        this.store.dispatch(new TablesActions.SetUsersAction(users));
      });
  }

  getRoles() {
    this.httpClient.get<RoleModel[]>(this.basehost +'/v1/roles/details')
      .subscribe((roles: RoleModel[]) => {
        this.store.dispatch(new TablesActions.SetRolesAction(roles));
      });
  }

  addRoleToUser(data: { username: string, rolename: string }) {
    return this.httpClient.post(this.basehost +'/v1/users/' + data.username + '/roles/' + data.rolename, null)
      .subscribe((user: UserModel) => {
        this.store.dispatch(new TablesActions.AddRoleToUser(user));
        return true;
      });
  }

  removeRoleFromUser(data: { user: UserModel, rolename: string }) {
    this.httpClient.delete<boolean>(this.basehost +'/v1/users/' + data.user.username + '/roles/' + data.rolename)
      .subscribe((response) => {
        if (response) {
          data.user.roleNames.splice(data.user.roleNames.indexOf(data.rolename), 1);
          this.store.dispatch(new TablesActions.RemoveRoleFromUser(data.user));
        }
      });
  }

  addUserToRole(data: { rolename: string, username: string }) {
    return this.httpClient.post(this.basehost +'/v1/roles/' + data.rolename + '/users/' + data.username, null)
      .subscribe((role: RoleModel) => {
        this.store.dispatch(new TablesActions.AddUserToRole(role));
        return true;
      });
  }

  removeUserFromRole(data: { role: RoleModel, username: string }) {
    this.httpClient.delete<boolean>(this.basehost +'/v1/roles/' + data.role.name + '/users/' + data.username)
      .subscribe((response) => {
        if (response) {
          let usertoRemove
          data.role.userDtos.forEach(user => {
            if (user.username == data.username) {
              usertoRemove = user;
            }
          });
          data.role.userDtos.splice(data.role.userDtos.indexOf(usertoRemove), 1);
          this.store.dispatch(new TablesActions.RemoveUserFromRole(data.role));
        }
      });
  }

  addNewRow(tableName: string, newRow: RowContentModel) {
    console.log(this.httpClient.post<RowContentModel>(this.basehost +'/v1/projects/tables/' + tableName + '/row', newRow)
      .subscribe((savedRow: RowContentModel) => {
        this.store.dispatch(new TablesActions.AddRowAction(savedRow));
      }));
  }

  updateRow(tableName: string, updatedRow: RowContentModel) {
    console.log(this.httpClient.put<RowContentModel>(this.basehost +'/v1/projects/tables/' + tableName + '/row', updatedRow)
      .subscribe((savedRow: RowContentModel) => {
      console.log(savedRow);
        this.store.dispatch(new TablesActions.UpdateRowAction(savedRow));
      }));
  }
}
