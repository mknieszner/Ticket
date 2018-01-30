import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthCookie} from "./shared/auth-cookies-handler";
import {Store} from "@ngrx/store";
import * as fromAppReducers from "./shared/store/app.reducers";
import {TaskInfoService} from "./shared/socket/task-info.service";
import {Client} from 'stompjs/lib/stomp.js';
import * as UserActions from "./shared/store/user/users.actions";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import * as TableActions from "./shared/store/table/tables.actions";
import {StoreResetService} from "./shared/store-reset.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  stompClient: Client;
  currentUser: Observable<string>;

  constructor(private cookie: AuthCookie,
              private store: Store<fromAppReducers.AppState>,
              private taskInfo: TaskInfoService,
              private router: Router,
              private resetService: StoreResetService) {
  }

  ngOnInit() {
    this.currentUser = this.store.select('users', 'currentUser');
    this.currentUser.subscribe((user: string) => {
        if (user.length > 0) {
          this.store.dispatch(new UserActions.SetNewWebSocketClient(this.stompClient = this.taskInfo.getClient()))
        } else {
          this.router.navigate(['/signin']);
        }
      }
    )
  }
  
  ngOnDestroy() {
    this.resetService.resetStore();
  }
}
