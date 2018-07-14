import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromAppReducers from '../shared/store/app.reducers';
import {OauthService} from '../shared/oauth.service';
import {DataStorageService} from '../shared/data-storage.service';
import {Token} from '../shared/auth.model';
import {Client} from 'stompjs/lib/stomp.js';
import * as UserActions from '../shared/store/user/users.actions';
import {StoreResetService} from '../shared/store-reset.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ChatMessageModel} from "../shared/chat-message.model";
import {Location} from "@angular/common";

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
  newTaskState: Observable<boolean>;
  currentUsername: string;
  chatChanged = false;
  chatModel: ChatMessageModel[] = [];
  private params: Params;
  private chatName: string;

  constructor(private store: Store<fromAppReducers.AppState>,
              private oauth: OauthService,
              private dss: DataStorageService,
              private resetService: StoreResetService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.newTaskState = this.store.select('users', 'newTaskInfo');
    this.token = this.store.select('users', 'token');
    this.username = this.store.select('users', 'currentUser');
    this.username.subscribe((username: string) => {
      if(username){
        this.dss.getCurrentUserRoles(username);
        this.currentUsername = username;
      }
    });
    this.currentUserRoles = this.store.select('users', 'currentUserRoles');
    this.isAdmin = this.currentUserRoles.map(roles => {
      let condition = false;
      roles.forEach(role => {
        if (role === 'ROLE_ADMIN') {
          condition = true;
        }
      });
      return condition;
    });
    this.store.select('chat', 'selectedChat').subscribe(chatName => this.chatName = chatName);
    this.route.params.subscribe(params => this.params = params)
    this.store.select('chat', 'chatContent').subscribe((chatModel: ChatMessageModel[]) => {
      this.chatModel = chatModel;
      if (chatModel.length <= 0 || chatModel[chatModel.length -1].senderName === this.currentUsername) {
        return;
      }
      if (this.location.path() === '/chat') {
        return;
      }
      this.chatChanged = true;
    });
  }

  onLogout() {
    this.resetService.resetStore();
    this.router.navigate(['/signin']);
    this.store.dispatch(new UserActions.SetLogoutInfo('You have been successfully logged out!'));
  }

  onNewTasksSeen() {
    this.store.dispatch(new UserActions.SetTaskInfoAction(false));
    this.router.navigate(['/users']);
  }

  toChat() {
    this.chatChanged = false;
    this.router.navigate(['/chat']);
  }
}
