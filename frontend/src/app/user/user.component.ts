import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserModel} from './user.model';
import {Store} from '@ngrx/store';
import {DataStorageService} from '../shared/data-storage.service';
import * as fromAppReducers from '../shared/store/app.reducers';
import * as UsersActions from '../shared/store/user/users.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: Observable<UserModel[]>;
  selectedUser: Observable<UserModel>;

  constructor(private contentStore: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.users = this.contentStore.select('users', 'users');
    this.contentStore.select('users', 'selectedUser');
    this.dss.getUsers();
  }

  onSelectUser(user: UserModel) {
    this.contentStore.dispatch(new UsersActions.SetSelectedUser(user));
    this.contentStore.dispatch(new UsersActions.SetUserDisplayedTask(null));
  }

  onNewUser() {
    this.contentStore.dispatch(new UsersActions.SetNewUserModeAction(true));
    this.contentStore.dispatch(new UsersActions.SetUserDisplayedTask(null));
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
