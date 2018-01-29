import {TableState} from "./table/tables.reducers";
import {UserState} from "./user/users.reducers";
import {TaskState} from "./task/tasks.reducers"
import {ChatState} from "./chat/chat.reducers";

export interface AppState {
  tables: TableState
  users: UserState
  tasks: TaskState
  chat: ChatState
}
