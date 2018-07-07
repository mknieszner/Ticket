import {Component, OnInit} from '@angular/core';
import {UserModel} from '../user.model';
import {DataStorageService} from '../../shared/data-storage.service';
import {RoleModel} from '../../roles/role.model';
import {Store} from '@ngrx/store';
import * as fromAppReducers from '../../shared/store/app.reducers';
import {Observable} from 'rxjs/Observable';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import * as UsersActions from '../../shared/store/user/users.actions';
import {TaskModel} from '../../shared/table.model';

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
  }

  ngOnInit() {
    this.userState = this.store.select('users', 'selectedUser');
    this.userState.subscribe((user: UserModel) => {
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
      this.createForm();
    });
  }

  postRemove() {
    this.dss.removeRoleFromUser({user: this.user, rolename: <string>this.roleForm.value.role});
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
        'username': new FormControl(null, [Validators.required]),
        'firstName': new FormControl(null, [Validators.required]),
        'lastName': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required]),
        'enabled': new FormControl(true, [Validators.required]),
        'roleNames': new FormArray([]),
        'taskDtos': new FormArray([])
      });
  }

  onRemoveUser(username: string, closeModalButton: HTMLButtonElement): boolean | void {
    if (closeModalButton && this.dss.deleteUser(username)) {
      closeModalButton.click();
    }
  }


// onSubmitRole(name, description) {
//   console.log(name, description);
//   this.dss.saveNewRole({name: name, description: description});
// }

  onSubmitUser() {
    this.dss.saveNewUser(this.newUserForm.value);
  }

  onSelectTask(taskDto: TaskModel) {
    this.store.dispatch(new UsersActions.SetUserDisplayedTask(taskDto));
  }
}
