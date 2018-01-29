import * as ChatActions from './chat.actions';
import {ChatMessageModel} from "../../chat-message.model";

export interface ChatState {
  chatContent: ChatMessageModel[];
}

const initialChatState: ChatState = {
  chatContent: []
};

export function chatReducers(state: ChatState = initialChatState, action: ChatActions.ChatActions) {
  switch (action.type) {
    case ChatActions.APPEND_CHAT_WITH_MESSAGE:
      return {
        ...state,
        chatContent: [...state.chatContent, action.payload]
      };
    default:
      return state;
  }
}
