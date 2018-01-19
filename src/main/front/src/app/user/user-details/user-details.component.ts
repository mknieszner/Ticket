import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../user.model';
import {DataStorageService} from "../../shared/data-storage.service";
import {RoleModel} from "../../roles/role.model";
import {Store} from "@ngrx/store";
import * as fromTableReducers from '../../shared/store/tables.reducers'
import {Observable} from "rxjs/Observable";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() user: UserModel;
  editRoleMode = false;
  roles: Observable<RoleModel[]>;
  roleForm: FormGroup;

  constructor(private store: Store<fromTableReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.roles = this.store.select('tables', 'roles');
    this.dss.getRoles();
    this.roleForm =
      new FormGroup({
        'role': new FormControl('Select option')
      });
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
}
