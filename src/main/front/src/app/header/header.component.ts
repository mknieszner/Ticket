import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import * as fromAppReducers from '../shared/store/app.reducers'
import * as TablesActions from "../shared/store/table/tables.actions";
import {OauthService} from "../shared/oauth.service";
import {AuthCookie} from "../shared/auth-cookies-handler";
import {DataStorageService} from "../shared/data-storage.service";
import {Token} from "../shared/auth.model";
import {TaskInfoService} from "../shared/socket/task-info.service";
import {Client} from 'stompjs/lib/stomp.js';
import * as UserActions from "../shared/store/user/users.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token: Observable<Token>;
  username: Observable<string>;
  currentUserRoles: Observable<string[]>;
  isAdmin: Observable<boolean>;
  stompClientState: Observable<Client>;
  stompClient: Client;
  newTaskState: Observable<boolean>;
  currentUsername: string;

  constructor(private store: Store<fromAppReducers.AppState>,
              private oauth: OauthService,
              private dss: DataStorageService,
              private taskInfo: TaskInfoService) {
  }

  ngOnInit() {
    this.newTaskState = this.store.select('users', 'newTaskInfo');
    this.stompClientState = this.store.select('users', 'currentSocketClient');
    this.stompClientState.forEach((stompClient: Client) => {
      this.stompClient = stompClient;
    });
    this.token = this.store.select('users', 'token');
    this.username = this.store.select('users', 'currentUser');
    this.username.subscribe((username: string) => {
      this.dss.getCurrentUserRoles(username);
      this.currentUsername = username;
    });
    this.currentUserRoles = this.store.select('users', 'currentUserRoles');
    this.isAdmin = this.currentUserRoles.map(roles => {
      let condition: boolean = false;
      roles.forEach(role => {
        if (role == 'ROLE_ADMIN') {
          condition = true;
        }
      })
      return condition;
    });
  }

  onLogout() {
    this.oauth.logout();
    this.store.dispatch(new TablesActions.ResetStore());
  }

  sendTaskInfo() {
    this.stompClient.send('/app/newTasks/mk', {});
  }

  onNewTasksSeen() {
    this.store.dispatch(new UserActions.TaskInfoAction(false))
  }
}
