import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import * as fromAppReducers from '../shared/store/app.reducers'
import * as TablesActions from "../shared/store/table/tables.actions";
import {Token} from "../shared/row.model";
import {OauthService} from "../shared/oauth.service";
import {AuthCookie} from "../shared/auth-cookies-handler";
import {DataStorageService} from "../shared/data-storage.service";

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

  constructor(private store: Store<fromAppReducers.AppState>,
              private oauth: OauthService,
              private cookie: AuthCookie,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.cookie.deleteAuth()
    this.token = this.store.select('users', 'token');
    this.username = this.store.select('users', 'currentUser');
    this.username.subscribe((username: string) => {
      this.dss.getCurrentUserRoles(username);
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
}
