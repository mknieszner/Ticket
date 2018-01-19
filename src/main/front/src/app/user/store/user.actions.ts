import {Action} from '@ngrx/store';
import {UserModel} from '../user.model';

export const ADD_USER = 'ADD_USER';

export class AddUserAction implements Action {
  readonly type = ADD_USER;

  constructor(public payload: UserModel) {}
}

export type UserActions = AddUserAction;
