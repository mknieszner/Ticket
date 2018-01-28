import {Action} from "@ngrx/store";
import {TaskModel} from "../../table.model";

export const SET_TASK_DETAILS_MODE = 'SET_TASK_DETAILS_MODE';
export const SET_SHOWED_TASK = 'SET_SHOWED_TASK';
export const ON_DELETE_TASK = 'ON_DELETE_TASK';

export class SetTaskDetailsModeAction implements Action {
  readonly type = SET_TASK_DETAILS_MODE;

  constructor(public payload: boolean) {
  }
}

export class SetShowedTaskAction implements Action {
  readonly type = SET_SHOWED_TASK;

  constructor(public payload: TaskModel) {
  }
}

export class OnDeleteTask implements Action {
  readonly type = ON_DELETE_TASK;

  constructor(public payload: Number) {
  }
}

export type TaskActions =
  SetTaskDetailsModeAction |
  SetShowedTaskAction |
  OnDeleteTask;
