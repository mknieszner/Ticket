import * as TableActions from './tables.actions';
import {ExtendedFilterModel, RowContentModel, TableDefinitionModel, TaskModel} from "../../table.model";
import {UserModel} from "../../../user/user.model";
import {RoleModel} from "../../../roles/role.model";
import {UserState} from "../user/users.reducers";

export interface TableState {
  editRowMode: boolean,
  newRowMode: boolean,
  editedRow: RowContentModel,
  tableDefinition: TableDefinitionModel,
  tableContent: RowContentModel[],
  tableUsers: UserModel[],
  tablesNames: string[],
  tableFilter: string,
  extendedFilterMode: boolean,
  extendedFilterAction: boolean
  extendedFilterContent: ExtendedFilterModel
}

const initialTableState: TableState = {
  editRowMode: false,
  newRowMode: false,
  editedRow: null,
  tableDefinition: null,
  tableContent: [],
  tableUsers: [],
  tablesNames: [],
  tableFilter: '',
  extendedFilterMode: false,
  extendedFilterAction: false,
  extendedFilterContent: null
};

export function tablesReducers(state: TableState = initialTableState, action: TableActions.TableActions) {
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
        ...initialTableState
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
        ...initialTableState,
        tablesNames: state.tablesNames,
      };
    case TableActions.SET_ROW_TASKS:
      return {
        ...state,
        tableContent: [...setRowTasks(state.tableContent, action.payload)]
      };
    case TableActions.SET_TABLE_USERS:
      return {
        ...state,
        tableUsers: [...action.payload]
      };
    case TableActions.UPDATE_ROWS_TASK:
      return {
        ...state,
        tableContent: [...updateTaskUsers(state.tableContent, action.payload)]
      };
    default:
      return state;
  }
}

function updateTaskUsers(tableContent: RowContentModel[], payload: { rowId: number, task: TaskModel }): RowContentModel[] {
  tableContent.forEach((row: RowContentModel,i) => {
    if (row.id == payload.rowId) {
      row.taskDtos.forEach((taskDto: TaskModel,j) => {
        if (taskDto.id == payload.task.id) {
          tableContent[i].taskDtos[j].userNames = payload.task.userNames;
        }
      })
    }
  });
  return tableContent;
}


function setRowTasks(rows: RowContentModel[], data: { tasks: TaskModel[], rowId }): RowContentModel[] {
  rows.forEach((row, i) => {
    if (row.id == data.rowId) {
      row.taskDtos = data.tasks;
    }
  });
  return rows;
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
