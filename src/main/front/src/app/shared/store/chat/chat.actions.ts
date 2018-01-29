import {Action} from "@ngrx/store";
import {TaskModel} from "../../table.model";
import {ChatMessageModel} from "../../chat-message.model";

export const APPEND_CHAT_WITH_MESSAGE = 'APPEND_CHAT_WITH_MESSAGE';

export class AppendChatWithMessage implements Action {
  readonly type = APPEND_CHAT_WITH_MESSAGE;

  constructor(public payload: ChatMessageModel) {
  }
}

export type ChatActions =
  AppendChatWithMessage;
