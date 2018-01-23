import * as TableActions from './tables.actions';
import {ExtendedFilterModel, RowContentModel, TableDefinitionModel, Token} from "../row.model";
import {UserModel} from "../../user/user.model";
import {RoleModel} from "../../roles/role.model";

export interface AppState {
  tables: State
}

export interface State {
  currentUser: string,
  currentUserRoles: string[],
  token: Token,
  editRowMode: boolean,
  newRowMode: boolean,
  editedRow: RowContentModel,
  tableDefinition: TableDefinitionModel,
  tableContent: RowContentModel[],
  tablesNames: string[],
  users: UserModel[],
  newUserMode: boolean,
  roles: RoleModel[],
  newRoleMode: boolean,
  tableFilter: string,
  extendedFilterMode: boolean,
  extendedFilterAction: boolean
  extendedFilterContent: ExtendedFilterModel
}

const initialState: State = {

  currentUser: '',
  currentUserRoles: [],
  token: null,
  editRowMode: false,
  newRowMode: false,
  editedRow: null,
  tableDefinition: null,
  // tableDefinition: {
  //   id: 0,
  //   name: '',
  //   columnDetailDefinitionDtoList: ['']
  // },
  tableContent: [],
  tablesNames: [],
  users: [],
  newUserMode: false,
  roles: [],
  newRoleMode: false,
  tableFilter: '',
  extendedFilterMode: false,
  extendedFilterAction: false,
  extendedFilterContent: null
};

export function tablesReducers(state: State = initialState, action: TableActions.TablesActions) {
  switch (action.type) {
    case TableActions.ADD_ROW:
      return {
        ...state,
        tableContent: [...state.tableContent, action.payload]
      };
    case TableActions.UPDATE_ROW:
      return {
        ...state,
        tableContent: [...updateRow(state.tableContent, action.payload)]
      };
    case TableActions.SET_ROWS:
      return {
        ...state,
        tableContent: [...action.payload]
      };
    case TableActions.SET_NAMES:
      return {
        ...state,
        tablesNames: [...action.payload]
      };
    case TableActions.ADD_NAMES:
      return {
        ...state,
        tablesNames: [...state.tablesNames, ...action.payload]
      };
    case TableActions.SET_DEFINITION:
      return {
        ...state,
        tableDefinition: [action.payload]
      };
    case TableActions.SET_NEW_USER_MODE:
      return {
        ...state,
        newUserMode: action.payload
      };
    case TableActions.SET_NEW_ROLE_MODE:
      return {
        ...state,
        newRoleMode: action.payload
      };
    case TableActions.ADD_ROLE:
      return {
        ...state,
        roles: [...state.roles, action.payload]
      };
    case TableActions.DELETE_ROLE:
      return {
        ...state,
        roles: [...deleteItemByName(state.roles, action.payload)]
      };
    case TableActions.DELETE_USER:
      return {
        ...state,
        users: [...deleteItemByUsername(state.users, action.payload)]
      };
    case TableActions.SET_USERS:
      return {
        ...state,
        users: [...action.payload]
      };
    case TableActions.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case TableActions.SET_ROLES:
      return {
        ...state,
        roles: [...action.payload]
      };
    case TableActions.ADD_ROLE_TO_USER:
      return {
        ...state,
        users: [...updateUsersRoles(state.users, action.payload)]
      };
    case TableActions.REMOVE_ROLE_FROM_USER:
      return {
        ...state,
        users: [...updateUsersRoles(state.users, action.payload)]
      };
    case TableActions.REMOVE_USER_FROM_ROLE:
      return {
        ...state,
        roles: [...updateRoleUsers(state.roles, action.payload)]
      };
    case TableActions.SET_CURRENT_USER_ROLENAMES:
      return {
        ...state,
        currentUserRoles: action.payload
      };

    case TableActions.DELETE_TOKEN:
      return {
        ...state,
        token: null
      };
    case TableActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case TableActions.DELETE_CURRENT_USER:
      return {
        ...state,
        currentUser: ''
      };
    case TableActions.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case TableActions.EDIT_ROW_MODE:
      return {
        ...state,
        editRowMode: action.payload
      };
    case TableActions.NEW_ROW_MODE:
      return {
        ...state,
        newRowMode: action.payload
      };
    case TableActions.EDITED_ROW:
      return {
        ...state,
        editedRow: action.payload
      };
    case TableActions.RESET_STORE:
      return {
        ...initialState
      };
    case TableActions.SET_FILTER:
      return {
        ...state,
        tableFilter: action.payload
      };
    case TableActions.EXTENDED_FILTER_MODE:
      return {
        ...state,
        extendedFilterMode: !state.extendedFilterMode
      };
    case TableActions.RUN_EXTENDED_FILTER:
      return {
        ...state,
        extendedFilterAction: !state.extendedFilterAction
      };
    case TableActions.SET_EXTENDED_FILTER:
      return {
        ...state,
        extendedFilterContent: action.payload
      };
    case TableActions.SWITCH_TABLE_RESET:
      return {
        ...initialState,
        tablesNames: state.tablesNames,
        currentUser: state.currentUser,
        currentUserRoles: state.currentUserRoles,
        token: state.token,
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
