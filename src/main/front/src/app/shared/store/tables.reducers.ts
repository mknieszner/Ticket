import * as TableActions from './tables.actions';
import {RowContentModel, TableDefinitionModel, Token} from "../row.model";
import {UserModel} from "../../user/user.model";
import {RoleModel} from "../../roles/role.model";
import {forEach} from "@angular/router/src/utils/collection";

export interface AppState {
  tables: State
}

export interface State {
  currentUser: string,
  token: Token,
  newRowMode: boolean,
  editRowMode: boolean,
  tableDefinition: TableDefinitionModel,
  tableContent: RowContentModel[],
  tablesNames: string[],
  users: UserModel[],
  roles: RoleModel[]
}

const initialState: State = {
  currentUser: '',
  token: null,
  newRowMode: false,
  editRowMode: false,
  tableDefinition: {
    id: 0,
    name: '',
    columnDetailDefinitionDtoList: ['']
  },
  tableContent: [],
  tablesNames: [],
  users: [],
  roles: []
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
    case TableActions.SET_NEW_ROW_MODE:
      return {
        ...state,
        newRowMode: [action.payload]
      };
    case TableActions.SET_USERS:
      return {
        ...state,
        users: [...action.payload]
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
    case TableActions.RESET_STORE:
      return {
        ...initialState
      };
    default:
      return state;
  }
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
