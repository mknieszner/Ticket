import {TableState} from "./table/tables.reducers";
import {UserState} from "./user/users.reducers";

export interface AppState {
  tables: TableState
  users: UserState
}
