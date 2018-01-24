import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {RoleModel} from './role.model';
import * as fromAppReducers from "../shared/store/app.reducers";
import {DataStorageService} from "../shared/data-storage.service";
import * as UsersActions from "../shared/store/user/users.actions";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Observable<RoleModel[]>;
  selectedRole: RoleModel;


  constructor(private roleStore: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.roles = this.roleStore.select('users', 'roles');
    this.dss.getRoles();
  }

  onSelectRole(role: RoleModel) {
    this.selectedRole = role;
  }

  onNewRole() {
    this.roleStore.dispatch(new UsersActions.SetNewRoleModeAction(true));
  }

  onRemoveRole(name: string) {
    this.dss.deleteRole(name);
    this.roleStore.dispatch(new UsersActions.SetNewRoleModeAction(false))
    this.selectedRole = null;
  }
}
