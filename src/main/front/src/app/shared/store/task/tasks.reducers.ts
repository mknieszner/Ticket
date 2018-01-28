import * as TaskActions from './tasks.actions';
import {TaskModel} from "../../table.model";

export interface TaskState {
  taskDetailsMode: boolean,
  showedTask: TaskModel
}

const initialTableState: TaskState = {
  taskDetailsMode: false,
  showedTask: null
};

export function tasksReducers(state: TaskState = initialTableState, action: TaskActions.TaskActions) {
  switch (action.type) {
    case TaskActions.SET_TASK_DETAILS_MODE:
      return {
        ...state,
        taskDetailsMode: action.payload
      };
    case TaskActions.SET_SHOWED_TASK:
      return {
        ...state,
        showedTask: action.payload
      };
    case TaskActions.ON_DELETE_TASK:
      state.taskDetailsMode = false;
      state.showedTask = null;
      return {
        state
      };
    default:
      return state;
  }
}
