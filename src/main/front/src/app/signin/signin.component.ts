import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {OauthService} from '../shared/oauth.service';
import {AuthCookie} from '../shared/auth-cookies-handler';
import {Store} from '@ngrx/store';
import * as fromAppReducers from '../shared/store/app.reducers';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  info: string;
  loginFailureInfo: Observable<string>;
  logoutInfo: Observable<string>;


  constructor(private oauthservice: OauthService,
              private cookie: AuthCookie,
              private store: Store<fromAppReducers.AppState>) {

  }

  ngOnInit() {
    this.logoutInfo = this.store.select('users', 'logoutInfo');
    this.loginFailureInfo = this.store.select('users', 'loginFailureInfo');

    AuthCookie.deleteAuth();
    this.signinForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl()
    });
  }


  onSignin() {
    this.oauthservice.obtainAccessToken({
      username: this.signinForm.value.username,
      password: this.signinForm.value.password
    });
  }
}
