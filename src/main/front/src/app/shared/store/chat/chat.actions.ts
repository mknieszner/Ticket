import {Action} from "@ngrx/store";
import {TaskModel} from "../../table.model";
import {ChatMessageModel} from "../../chat-message.model";

export const APPEND_CHAT_WITH_MESSAGE = 'APPEND_CHAT_WITH_MESSAGE';
export const SET_ACTIVE_USERS = 'SET_ACTIVE_USERS';

export class AppendChatWithMessage implements Action {
  readonly type = APPEND_CHAT_WITH_MESSAGE;

  constructor(public payload: ChatMessageModel) {
  }
}

export class SetActiveWsUsers implements Action {
  readonly type = SET_ACTIVE_USERS;

  constructor(public payload: string[]) {
  }
}

export type ChatActions =
  AppendChatWithMessage |
  SetActiveWsUsers;
