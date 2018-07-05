import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import * as SockJS from 'sockjs-client';
import {AuthCookie} from '../auth-cookies-handler';
import {Stomp, Client, Frame} from 'stompjs/lib/stomp.js';
import {Store} from '@ngrx/store';
import * as fromAppReducers from '../store/app.reducers';
import * as UserActions from '../store/user/users.actions';
import * as ChatActions from '../store/chat/chat.actions';


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
    const socket = new SockJS('http://localhost:8080/newTasks?access_token=' + AuthCookie.getAuth()) as WebSocket;
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      // console.log('CONNECT CONNECT', frame);
      this.store.select('users', 'currentUser').subscribe((username: string) => {
        this.stompClient.subscribe('/topic/newTasks/' + username, () => { // (messageOutput) =>
          // console.log(messageOutput);
          this.store.dispatch(new UserActions.SetTaskInfoAction(true));
        });
        this.stompClient.subscribe('/topic/chat', (messageOutput: Frame) => {
          // console.log('/topic/chat/',messageOutput.body);
          this.store.dispatch(new ChatActions.AppendChatWithMessage(JSON.parse(messageOutput.body)));
        });
        this.stompClient.subscribe('/topic/chat/' + username, (messageOutput: Frame) => {
          // console.log('/topic/chat/',messageOutput.body);
          this.store.dispatch(new ChatActions.AppendChatWithMessage(JSON.parse(messageOutput.body)));
        });
        this.stompClient.subscribe('/topic/people/chat', (messageOutput: Frame) => {
          // console.log('/topic/people/chat/',messageOutput.body);
          this.store.dispatch(new ChatActions.SetActiveWsUsers(JSON.parse(messageOutput.body)));
        });
      });
    });
    return this.stompClient;
  }
}
