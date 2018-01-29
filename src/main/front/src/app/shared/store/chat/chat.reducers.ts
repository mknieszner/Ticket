import * as ChatActions from './chat.actions';
import {ChatMessageModel} from "../../chat-message.model";

export interface ChatState {
  chatContent: ChatMessageModel[];
  activeUsers: string[];
}

const initialChatState: ChatState = {
  chatContent: [],
  activeUsers: []
};

export function chatReducers(state: ChatState = initialChatState, action: ChatActions.ChatActions) {
  switch (action.type) {
    case ChatActions.APPEND_CHAT_WITH_MESSAGE:
      return {
        ...state,
        chatContent: [...state.chatContent, action.payload]
      };
    case ChatActions.SET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: [...action.payload]
      };
    default:
      return state;
  }
}
