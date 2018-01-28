import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import * as SockJS from "sockjs-client"
import {AuthCookie} from "../auth-cookies-handler";
import {Stomp, Client, Frame} from 'stompjs/lib/stomp.js';
import {Store} from "@ngrx/store";
import * as fromAppReducers from "../store/app.reducers";
import * as UserActions from "../store/user/users.actions";


@Injectable()
export class WebSocketService {
  stompClient: Client;

  constructor(private cookie: AuthCookie,
              private store: Store<fromAppReducers.AppState>) {
  }

  public connect(): Client {

      return this.connectWS();
  }

  private connectWS(): Subject<any> {
    const socket = new SockJS('http://localhost:8080/newTasks?access_token=' + this.cookie.getAuth()) as WebSocket;
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: Frame) => {
      console.log('CONNECT CONNECT', frame);
      this.store.select('users', 'currentUser').subscribe((username: string) => {
        this.stompClient.subscribe('/topic/newTasks/' + username, (messageOutput) => {
          console.log(messageOutput);
          this.store.dispatch(new UserActions.TaskInfoAction(true));
          console.log('new UserActions.TaskInfoAction(true)');
        });
      })
    });
    return this.stompClient;
  }
}
