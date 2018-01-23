import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserModel} from './user.model';
import {Store} from '@ngrx/store';
import {DataStorageService} from "../shared/data-storage.service";
import * as fromTableReducers from '../shared/store/tables.reducers'
import * as TablesActions from "../shared/store/tables.actions";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: Observable<UserModel[]>;
  selectedUser: UserModel;

  constructor(private contentStore: Store<fromTableReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.users = this.contentStore.select('tables', 'users');
    this.dss.getUsers();
  }

  onSelectUser(user: UserModel) {
    this.selectedUser = user;
  }

  onNewUser() {
    console.log('onNewUser');
    this.contentStore.dispatch(new TablesActions.SetNewUserModeAction(true))
  }

  onRemoveUser(username: string) {
    this.dss.deleteUser(username);
    this.contentStore.dispatch(new TablesActions.SetNewUserModeAction(false))
    this.selectedUser = null;
  }

  // // onNewRole() {
  // //   this.roleStore.dispatch(new TablesActions.SetNewRoleModeAction(true));
  // // }
  //
  // onRemoveRole(name: string) {
  //   this.dss.deleteRole(name);
  //   this.roleStore.dispatch(new TablesActions.SetNewRoleModeAction(false))
  //   this.selectedRole = null;
  // }
}
