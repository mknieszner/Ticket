import {Component, Input, OnInit} from '@angular/core';
import {RoleModel} from '../role.model';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {UserModel} from "../../user/user.model";
import {Store} from "@ngrx/store";
import {DataStorageService} from "../../shared/data-storage.service";
import * as fromAppReducers from '../../shared/store/app.reducers'
import * as UsersActions from "../../shared/store/user/users.actions";

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  @Input() role: RoleModel;
  editUserMode = false;
  users: Observable<UserModel[]>;
  userForm: FormGroup;
  newRoleMode: Observable<boolean>;

  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.newRoleMode = this.store.select('users', 'newRoleMode');
    this.users = this.store.select('users', 'users');
    this.dss.getUsers();
    this.userForm =
      new FormGroup({
        'user': new FormControl('Select option')
      });
  }

  postRemoveUser() {
    this.dss.removeUserFromRole({role: this.role, username: <string>this.userForm.value.user})
  }

  onEditUserMode() {
    this.editUserMode = true;
  }

  postAddUser() {
    if (this.dss.addRoleToUser({rolename: this.role.name, username: <string>this.userForm.value.user})) {
      this.users.subscribe((users: UserModel[]) => {
        users.forEach((user) => {
            if (user.username === this.userForm.value.user) {
              this.role.userDtos.push(user);
            }
        })
      }).unsubscribe();
    }
  }

  abortAddUser() {
    this.editUserMode = false;
  }

  onSubmitRole(name, description) {
    this.dss.saveNewRole({name: name, description: description});
  }

  onAbortSubmitRole() {
    this.store.dispatch(new UsersActions.SetNewRoleModeAction(false));
  }
}
