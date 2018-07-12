import * as ChatActions from './chat.actions';
import {ChatMessageModel} from '../../chat-message.model';

export interface ChatState {
  chatContent: ChatMessageModel[];
  activeUsers: string[];
  selectedChat: string;
}

const initialChatState: ChatState = {
  chatContent: [],
  activeUsers: [],
  selectedChat: ''
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
    case ChatActions.SELECT_CHAT:
      return {
        ...state,
        selectedChat: action.payload
      };
    case ChatActions.RESET_STORE:
      return {
        ...initialChatState,
      };
    default:
      return state;
  }
}
