import {Action} from '@ngrx/store';
import {RoleModel} from '../role.model';

export const ADD_ROLE = 'ADD_ROLE';

export class AddRoleAction implements Action {
  readonly type = ADD_ROLE;

  constructor(public payload: RoleModel) {}
}

export type RoleActions = AddRoleAction;
