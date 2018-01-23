import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {RoleModel} from './role.model';
import * as fromTableReducers from "../shared/store/tables.reducers";
import {DataStorageService} from "../shared/data-storage.service";
import * as TablesActions from "../shared/store/tables.actions";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Observable<RoleModel[]>;
  selectedRole: RoleModel;


  constructor(private roleStore: Store<fromTableReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.roles = this.roleStore.select('tables', 'roles');
    this.dss.getRoles();
  }

  onSelectRole(role: RoleModel) {
    this.selectedRole = role;
  }

  onNewRole() {
    this.roleStore.dispatch(new TablesActions.SetNewRoleModeAction(true));
  }

  onRemoveRole(name: string) {
    this.dss.deleteRole(name);
    this.roleStore.dispatch(new TablesActions.SetNewRoleModeAction(false))
    this.selectedRole = null;
  }
}
