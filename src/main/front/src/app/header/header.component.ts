import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import * as fromAppReducers from '../shared/store/tables.reducers'
import * as TablesActions from "../shared/store/tables.actions";
import {Token} from "../shared/row.model";
import {OauthService} from "../shared/oauth.service";
import {AuthCookie} from "../shared/auth-cookies-handler";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token: Observable<Token>;
  username: Observable<string>;

  constructor(private store: Store<fromAppReducers.AppState>, private oauth: OauthService, private cookie: AuthCookie) { }

  ngOnInit() {
    this.cookie.deleteAuth()
    this.token = this.store.select('tables','token');
    this.username = this.store.select('tables','currentUser');
  }

  onLogout() {
    this.oauth.logout();
    this.store.dispatch(new TablesActions.ResetStore());
  }
}
