import {Action} from "@ngrx/store";
import {UserModel} from "../../../user/user.model";
import {RoleModel} from "../../../roles/role.model";
import {Token} from "../../row.model";

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
export const SWITCH_TABLE_RESET = 'SWITCH_TABLE_RESET';



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


export class RemoveRoleFromUser implements Action {
  readonly type = REMOVE_ROLE_FROM_USER;

  constructor(public payload: UserModel) {
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

export class SwitchTableReset implements Action {
  readonly type = SWITCH_TABLE_RESET;

  constructor() {
  }
}

export type UserActions =
  SetCurrentUserRolenames |
  DeleteUserAction|
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
  SetTokenAction |
  DeleteTokenAction |
  SetCurrentUserAction |
  DeleteCurrentUserAction |
  SwitchTableReset;

