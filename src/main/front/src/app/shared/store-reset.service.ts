import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import * as fromAppReducers from "./store/app.reducers";
import * as TableActions from "./store/table/tables.actions";
import * as UserActions from "./store/user/users.actions";
import * as ChatActions from "./store/chat/chat.actions";
import * as TaskActions from "./store/task/tasks.actions";
import {AuthCookie} from "./auth-cookies-handler";
import {TaskInfoService} from "./socket/task-info.service";


@Injectable()
export class StoreResetService {

  constructor(private store: Store<fromAppReducers.AppState>,
              private cookie: AuthCookie,
              private ws: TaskInfoService){}

  public resetStore(){
    this.ws.stompClient.disconnect();
    this.store.dispatch(new TableActions.ResetStore());
    this.store.dispatch(new UserActions.ResetStore());
    this.store.dispatch(new ChatActions.ResetStore());
    this.store.dispatch(new TaskActions.ResetStore());
    this.cookie.deleteAuth()
  }
}
