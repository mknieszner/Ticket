import {Action} from '@ngrx/store';
import {RowContentModel, TableDefinitionModel, Token} from '../row.model';
import {UserModel} from "../../user/user.model";
import {RoleModel} from "../../roles/role.model";

export const RESET_STORE = 'RESET_STORE';

export const ADD_ROW = 'ADD_ROW';
export const UPDATE_ROW = 'UPDATE_ROW';

export const SET_ROWS = 'SET_ROWS';

export const SET_DEFINITION = 'SET_DEFINITION';

export const SET_NAMES = 'SET_NAMES';
export const ADD_NAMES = 'ADD_NAMES';

export const SET_NEW_ROW_MODE = 'SET_NEW_ROW_MODE';

export const SET_USERS = 'SET_USERS';
export const ADD_ROLE_TO_USER = 'ADD_ROLE_TO_USER';
export const REMOVE_ROLE_FROM_USER = 'REMOVE_ROLE_FROM_USER';

export const SET_ROLES = 'SET_ROLES';
export const REMOVE_USER_FROM_ROLE = 'REMOVE_USER_FROM_ROLE';
export const ADD_USER_TO_ROLE = 'ADD_USER_TO_ROLE';

export const SET_TOKEN = 'SET_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';

export const DELETE_CURRENT_USER = 'DELETE_CURRENT_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';


export class SetNewRowModeAction implements Action {
  readonly type = SET_NEW_ROW_MODE;

  constructor(public payload: boolean) {
  }
}

export class AddRowAction implements Action {
  readonly type = ADD_ROW;

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

export class SetUsersAction implements Action {
  readonly type = SET_USERS;

  constructor(public payload: UserModel[]) {
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

export class ResetStore implements Action {
  readonly type = RESET_STORE;

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
  SetUsersAction |
  SetRolesAction |
  AddRoleToUser |
  RemoveRoleFromUser |
  AddUserToRole |
  RemoveUserFromRole |
  UpdateRowAction |
  SetTokenAction |
  DeleteTokenAction |
  SetCurrentUserAction |
  DeleteCurrentUserAction |
  ResetStore;
