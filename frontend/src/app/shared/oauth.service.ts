import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromAppReducers from './store/app.reducers';
import * as fromServerModel from '../shared/server.model';
import {AuthCookie} from './auth-cookies-handler';
import * as UserActions from './store/user/users.actions';
import {Token} from './auth.model';

@Injectable()
export class OauthService {
  basehost = fromServerModel.baseUrl;
  token: string;
  isAuthenticated: boolean;

  constructor(private router: Router,
              private httpClient: HttpClient,
              private store: Store<fromAppReducers.AppState>) {
    this.store.select('users', 'token').forEach(token => {
      if (token !== null) {
        AuthCookie.setAuth(token.access_token, token.expires_in);
        this.token = token.access_token;
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  obtainAccessToken(loginData: { username: string, password: string }) {
    const params = new HttpParams()
      .append('username', loginData.username)
      .append('password', loginData.password)
      .append('grant_type', 'password')
      .append('client_id', 'live-test');
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa('live-test:bG2ZS10ZXN0')
    });

    this.httpClient.post<Token>(this.basehost + '/oauth/token', null, {
      observe: 'body',
      headers: headers,
      params: params
    })
      .subscribe(
        (data: Token) => {
          this.saveToken(data, loginData.username);
          this.router.navigate(['/home']);
        },
        err => {
          console.log(err.message);
          const errorMessage = err.message;
          if (errorMessage.includes('live-test')) {
            this.store.dispatch(new UserActions.SetLoginFailureInfo('Invalid credentials!'));
          } else {
            switch (errorMessage) {
              case 'Http failure response for (unknown url): 0 Unknown Error':
                this.store.dispatch(new UserActions.SetLoginFailureInfo('Connection problem'));
                return;
              default:
                this.store.dispatch(new UserActions.SetLoginFailureInfo(errorMessage));
                return;
            }
          }
          return false;
        }
      );
  }

  // getResource(resourceUrl) : Observable<any> {
  //   var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
  //     'Authorization': 'Bearer ' + this.cookie.getAuth()});
  //   return this.httpClient.get(resourceUrl, { headers: headers }).subscribe({})
  //   //.catch((error:any) => Observable.throw('Server error',error));
  // }

  saveToken(token: Token, username: string) {
    // const expireDate = new Date().getTime() + (1000 * token.expires_in); // TODO remove??
    this.store.dispatch(new UserActions.SetTokenAction(token));
    this.store.dispatch(new UserActions.SetCurrentUserAction(username));
    AuthCookie.setAuth(token.access_token, token.expires_in);
  }
}
