import {Action} from '@ngrx/store';
import {ExtendedFilterModel, RowContentModel, TableDefinitionModel} from '../../row.model';

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

export type TableActions =
  AddRowAction |
  SetNamesAction |
  AddNamesAction |
  SetRowsAction |
  SetTableDefinitionAction |
  SetNewRowModeAction |
  UpdateRowAction |
  ResetStore |
  ShowRowDetailsAction |
  SetEditRowMode |
  SetEditedRow |
  TableFilter |
  SetExtendedFilterMode |
  RunExtendedFilter |
  SetExtendedFilter |
  SwitchTableReset;