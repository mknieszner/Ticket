import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../user.model';
import {DataStorageService} from "../../shared/data-storage.service";
import {RoleModel} from "../../roles/role.model";
import {Store} from "@ngrx/store";
import * as fromAppReducers from '../../shared/store/app.reducers'
import {Observable} from "rxjs/Observable";
import {Form, FormArray, FormControl, FormGroup} from "@angular/forms";
import * as UsersActions from "../../shared/store/user/users.actions";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {TaskModel} from "../../shared/table.model";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userState: Observable<UserModel>;
  user: UserModel;
  editRoleMode = false;
  roles: Observable<RoleModel[]>;
  roleForm: FormGroup;
  newUserMode: Observable<boolean>;
  newUserForm: FormGroup;
  userDisplayedTask: Observable<TaskModel>;

  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
    this.createForm();
  }

  ngOnInit() {
    this.userState = this.store.select('users', 'selectedUser');
    this.userState.subscribe((user: UserModel)=> {
      this.user = user;
    });
    this.userDisplayedTask = this.store.select('users', 'userDisplayedTask');
    this.newUserMode = this.store.select('users', 'newUserMode');
    this.roles = this.store.select('users', 'roles');
    this.dss.getRoles();
    this.roleForm =
      new FormGroup({
        'role': new FormControl('Select option')
      });
    this.newUserMode.subscribe(() => {
      this.newUserForm.reset();
    })
  }

  postRemove() {
    this.dss.removeRoleFromUser({user: this.user, rolename: <string>this.roleForm.value.role})
  }

  onEditRoleMode() {
    this.editRoleMode = true;
  }

  postAddRole() {
    if (this.dss.addRoleToUser({username: this.user.username, rolename: <string>this.roleForm.value.role})) {
      this.user.roleNames.push(<string>this.roleForm.value.role);
    }
  }

  abortAddRole() {
    this.editRoleMode = false;
  }

  onAbortSubmitUser() {
    this.store.dispatch(new UsersActions.SetNewUserModeAction(false));
  }

  createForm() {
    this.newUserForm =
      new FormGroup({
        'username': new FormControl(''),
        'firstName': new FormControl(''),
        'lastName': new FormControl(''),
        'password': new FormControl(''),
        'email': new FormControl(''),
        'enabled': new FormControl(true),
        'roleNames': new FormArray([]),
        'taskDtos': new FormArray([])
      })
  }

  onRemoveUser(username: string) {
    console.log(username);
    this.dss.deleteUser(username);
    this.store.dispatch(new UsersActions.SetNewUserModeAction(false))
    this.store.dispatch(new UsersActions.SetUserDisplayedTask(null));
  }


// onSubmitRole(name, description) {
//   console.log(name, description);
//   this.dss.saveNewRole({name: name, description: description});
// }
  onSubmitUser(elements: HTMLFormControlsCollection, length: number) {
    console.log(this.newUserForm.value);
    this.dss.saveNewUser(this.newUserForm.value);
  }

  onSelectTask(taskDto: TaskModel) {
    this.store.dispatch(new UsersActions.SetUserDisplayedTask(taskDto));
  }
}
