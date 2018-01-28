import * as UserActions from './users.actions';
import {ExtendedFilterModel, RowContentModel, TableDefinitionModel} from "../../table.model";
import {UserModel} from "../../../user/user.model";
import {RoleModel} from "../../../roles/role.model";
import {TableState} from "../table/tables.reducers";
import {Token} from "../../auth.model";
import {Client} from 'stompjs/lib/stomp.js';


export interface UserState {
  newTaskInfo: boolean
  currentSocketClient: Client
  currentUser: string,
  currentUserRoles: string[],
  token: Token,
  users: UserModel[],
  newUserMode: boolean,
  roles: RoleModel[],
  newRoleMode: boolean,
}

const initialUserState: UserState = {
  newTaskInfo: false,
  currentSocketClient: null,
  currentUser: '',
  currentUserRoles: [],
  token: null,
  users: [],
  newUserMode: false,
  roles: [],
  newRoleMode: false,
};

export function usersReducers(state: UserState = initialUserState, action: UserActions.UserActions) {
  switch (action.type) {
    case UserActions.SET_NEW_USER_MODE:
      return {
        ...state,
        newUserMode: action.payload
      };
    case UserActions.SET_NEW_ROLE_MODE:
      return {
        ...state,
        newRoleMode: action.payload
      };
    case UserActions.ADD_ROLE:
      return {
        ...state,
        roles: [...state.roles, action.payload]
      };
    case UserActions.DELETE_ROLE:
      return {
        ...state,
        roles: [...deleteItemByName(state.roles, action.payload)]
      };
    case UserActions.DELETE_USER:
      return {
        ...state,
        users: [...deleteItemByUsername(state.users, action.payload)]
      };
    case UserActions.SET_USERS:
      return {
        ...state,
        users: [...action.payload]
      };
    case UserActions.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case UserActions.SET_ROLES:
      return {
        ...state,
        roles: [...action.payload]
      };
    case UserActions.ADD_ROLE_TO_USER:
      return {
        ...state,
        users: [...updateUsersRoles(state.users, action.payload)]
      };
    case UserActions.REMOVE_ROLE_FROM_USER:
      return {
        ...state,
        users: [...updateUsersRoles(state.users, action.payload)]
      };
    case UserActions.REMOVE_USER_FROM_ROLE:
      return {
        ...state,
        roles: [...updateRoleUsers(state.roles, action.payload)]
      };
    case UserActions.SET_CURRENT_USER_ROLENAMES:
      return {
        ...state,
        currentUserRoles: action.payload
      };

    case UserActions.DELETE_TOKEN:
      return {
        ...state,
        token: null
      };
    case UserActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case UserActions.DELETE_CURRENT_USER:
      return {
        ...state,
        currentUser: ''
      };
    case UserActions.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case UserActions.SWITCH_TABLE_RESET:
      return {
        ...initialUserState,
        currentUser: state.currentUser,
        currentUserRoles: state.currentUserRoles,
        token: state.token,
      };
    case UserActions.SET_NEW_WEB_SOCKET_CLIENT:
      return {
        ...state,
        currentSocketClient: action.payload
      };
    case UserActions.SET_NEW_WEB_SOCKET_CLIENT:
      return {
        ...state,
        currentSocketClient: action.payload
      };
    case UserActions.SET_TASK_INFO:
      return {
        ...state,
        newTaskInfo: action.payload
      };
    default:
      return state;
  }
}

function deleteItemByName(array: NameModel[], itemName: string): Array<NameModel> {//TODO GENERIC TYPE FUNCTION???  r.216/255
  array.forEach((arrayItem, i) => {
    if (arrayItem.name === itemName) {
      array.splice(i, 1);
    }
  });
  return array;
}

function deleteItemByUsername(array: UsernameModel[], itemName: string) {
  array.forEach((arrayItem, i) => {
    if (arrayItem.username === itemName) {
      array.splice(i, 1);
    }
  });
  return array;
}


function updateRow(rows: RowContentModel[], updatedRow: RowContentModel): RowContentModel[] {
  rows.forEach((row, i) => {
    if (row.id == updatedRow.id) {
      rows[i] = updatedRow;
    }
  });
  return rows;
}

function updateRoleUsers(roles: RoleModel[], newRole: RoleModel): RoleModel[] {
  roles.forEach((role) => {
    if (role.name == newRole.name) {
      role.userDtos = newRole.userDtos;
    }
  });
  return roles;
}

function updateUsersRoles(users: UserModel[], newUser: UserModel): UserModel[] {
  users.forEach((user, i) => {
    if (user.username == newUser.username) {
      users[i].roleNames = newUser.roleNames;
    }
  });
  return users;
}

interface NameModel {
  name: string;
}

interface UsernameModel {
  username: string;
}
