import {Action} from '@ngrx/store';
import {ExtendedFilterModel, RowContentModel, TableDefinitionModel, Token} from '../row.model';
import {UserModel} from "../../user/user.model";
import {RoleModel} from "../../roles/role.model";

export const RESET_STORE = 'RESET_STORE';

export const ADD_ROW = 'ADD_ROW';
export const SHOW_ROW = 'SHOW_ROW';
export const UPDATE_ROW = 'UPDATE_ROW';
export const EDIT_ROW_MODE = 'EDIT_ROW_MODE';
export const EDITED_ROW = 'EDITED_ROW';

export const SET_ROWS = 'SET_ROWS';

export const SET_DEFINITION = 'SET_DEFINITION';

export const SET_NAMES = 'SET_NAMES';
export const ADD_NAMES = 'ADD_NAMES';

export const NEW_ROW_MODE = 'NEW_ROW_MODE';

export const SET_NEW_USER_MODE = 'SET_NEW_USER_MODE';
export const SET_USERS = 'SET_USERS';
export const ADD_USER = 'ADD_USER';

export const DELETE_USER = 'DELETE_USER';
export const ADD_ROLE_TO_USER = 'ADD_ROLE_TO_USER';
export const REMOVE_ROLE_FROM_USER = 'REMOVE_ROLE_FROM_USER';
export const SET_CURRENT_USER_ROLENAMES = 'SET_CURRENT_USER_ROLENAMES';

export const SET_NEW_ROLE_MODE = 'SET_NEW_ROLE_MODE';
export const SET_ROLES = 'SET_ROLES';
export const ADD_ROLE = 'ADD_ROLE';
export const DELETE_ROLE = 'DELETE_ROLE';
export const REMOVE_USER_FROM_ROLE = 'REMOVE_USER_FROM_ROLE';
export const ADD_USER_TO_ROLE = 'ADD_USER_TO_ROLE';

export const SET_TOKEN = 'SET_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';

export const DELETE_CURRENT_USER = 'DELETE_CURRENT_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const SET_FILTER = 'SET_FILTER';
export const EXTENDED_FILTER_MODE = 'EXTENDED_FILTER_MODE';
export const RUN_EXTENDED_FILTER = 'RUN_EXTENDED_FILTER';
export const SET_EXTENDED_FILTER = 'SET_EXTENDED_FILTER';
export const SWITCH_TABLE_RESET = 'SWITCH_TABLE_RESET';



export class SetNewRowModeAction implements Action {
  readonly type = NEW_ROW_MODE;

  constructor(public payload: boolean) {
  }
}

export class AddRowAction implements Action {
  readonly type = ADD_ROW;

  constructor(public payload: RowContentModel) {
  }
}

export class ShowRowDetailsAction implements Action {
  readonly type = SHOW_ROW;

  constructor(public payload: RowContentModel) {
  }
}

export class UpdateRowAction implements Action {
  readonly type = UPDATE_ROW;

  constructor(public payload: RowContentModel) {
  }
}

export class SetRowsAction implements Action {
  readonly type = SET_ROWS;

  constructor(public payload: RowContentModel[]) {
  }
}

export class SetTableDefinitionAction implements Action {
  readonly type = SET_DEFINITION;

  constructor(public payload: TableDefinitionModel) {
  }
}

export class SetNamesAction implements Action {
  readonly type = SET_NAMES;

  constructor(public payload: string[]) {
  }
}

export class AddNamesAction implements Action {
  readonly type = ADD_NAMES;

  constructor(public payload: string[]) {
  }
}

export class SetNewRoleModeAction implements Action {
  readonly type = SET_NEW_ROLE_MODE;

  constructor(public payload: boolean) {
  }
}

export class AddRoleAction implements Action {
  readonly type = ADD_ROLE;

  constructor(public payload: RoleModel) {
  }
}

export class DeleteRoleAction implements Action {
  readonly type = DELETE_ROLE;

  constructor(public payload: string) {
  }
}

export class DeleteUserAction implements Action {
  readonly type = DELETE_USER;

  constructor(public payload: string) {
  }
}

export class SetNewUserModeAction implements Action {
  readonly type = SET_NEW_USER_MODE;

  constructor(public payload: boolean) {
  }
}

export class SetUsersAction implements Action {
  readonly type = SET_USERS;

  constructor(public payload: UserModel[]) {
  }
}

export class AddUserAction implements Action {
  readonly type = ADD_USER;

  constructor(public payload: UserModel) {
  }
}

export class SetRolesAction implements Action {
  readonly type = SET_ROLES;

  constructor(public payload: RoleModel[]) {
  }
}

export class AddRoleToUser implements Action {
  readonly type = ADD_ROLE_TO_USER;

  constructor(public payload: UserModel) {
  }
}

export class RemoveRoleFromUser implements Action {
  readonly type = REMOVE_ROLE_FROM_USER;

  constructor(public payload: UserModel) {
  }
}

export class AddUserToRole implements Action {
  readonly type = ADD_USER_TO_ROLE;

  constructor(public payload: RoleModel) {
  }
}

export class RemoveUserFromRole implements Action {
  readonly type = REMOVE_USER_FROM_ROLE;

  constructor(public payload: RoleModel) {
  }
}

export class SetCurrentUserRolenames implements Action {
  readonly type = SET_CURRENT_USER_ROLENAMES;

  constructor(public payload: string[]) {
  }
}

export class SetTokenAction implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: Token) {
  }
}

export class DeleteTokenAction implements Action {
  readonly type = DELETE_TOKEN;

  constructor() {
  }
}

export class SetCurrentUserAction implements Action {
  readonly type = SET_CURRENT_USER;

  constructor(public payload: string) {
  }
}

export class DeleteCurrentUserAction implements Action {
  readonly type = DELETE_CURRENT_USER;

  constructor() {
  }
}

export class SetEditRowMode implements Action {
  readonly type = EDIT_ROW_MODE;

  constructor(public payload: boolean) {
  }
}

export class SetEditedRow implements Action {
  readonly type = EDITED_ROW;

  constructor(public payload: RowContentModel) {
  }
}

export class ResetStore implements Action {
  readonly type = RESET_STORE;

  constructor() {
  }
}

export class TableFilter implements Action {
  readonly type = SET_FILTER;

  constructor(public payload: string) {
  }
}

export class SetExtendedFilterMode implements Action {
  readonly type = EXTENDED_FILTER_MODE;

  constructor() {
  }
}

export class RunExtendedFilter implements Action {
  readonly type = RUN_EXTENDED_FILTER;

  constructor() {
  }
}

export class SetExtendedFilter implements Action {
  readonly type = SET_EXTENDED_FILTER;

  constructor(public payload: ExtendedFilterModel) {
  }
}

export class SwitchTableReset implements Action {
  readonly type = SWITCH_TABLE_RESET;

  constructor() {
  }
}

export type TablesActions =
  AddRowAction |
  SetNamesAction |
  AddNamesAction |
  SetRowsAction |
  SetTableDefinitionAction |
  SetNewRowModeAction |
  SetNewRoleModeAction |
  SetNewUserModeAction |
  SetUsersAction |
  AddUserAction |
  SetRolesAction |
  AddRoleAction|
  DeleteRoleAction |
  AddRoleToUser |
  RemoveRoleFromUser |
  AddUserToRole |
  RemoveUserFromRole |
  UpdateRowAction |
  SetTokenAction |
  DeleteTokenAction |
  SetCurrentUserAction |
  DeleteCurrentUserAction |
  ResetStore |
  ShowRowDetailsAction |
  SetEditRowMode |
  SetEditedRow |
  TableFilter |
  SetExtendedFilterMode |
  RunExtendedFilter |
  SetExtendedFilter |
  SwitchTableReset |
  SetCurrentUserRolenames |
  DeleteUserAction;
