import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Http, RequestOptions} from "@angular/http";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import * as fromAppReducers from './store/app.reducers'
import * as TablesActions from "./store/table/tables.actions";
import * as fromServerModel from "../shared/server.model";
import {AuthCookie} from "./auth-cookies-handler";
import * as UserActions from "./store/user/users.actions";
import {Token} from "./auth.model";


export class Foo {
  constructor(public id: number,
              public name: string) {
  }
}

@Injectable()
export class OauthService {
  basehost = fromServerModel.baseUrl;
  token: string;
  isAuthenticated: boolean;

  constructor(private router: Router, private httpClient: HttpClient, private store: Store<fromAppReducers.AppState>, private cookie: AuthCookie) {
    this.store.select('users', 'token').forEach(token => {
      if(token !== null) {
        this.cookie.setAuth(token.access_token,token.expires_in);
        this.token = token.access_token
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    })
  }

  obtainAccessToken(loginData: { username: string, password: string }) {
    let params = new HttpParams()
      .append('username', loginData.username)
      .append('password', loginData.password)
      .append('grant_type', 'password')
      .append('client_id', 'live-test');
    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa("live-test:bG2ZS10ZXN0")
    });

    this.httpClient.post<Token>(this.basehost +'/oauth/token', null, {
      observe: 'body',
      headers: headers,
      params: params
    })
      .subscribe(
        (data: Token) => {
          this.saveToken(data, loginData.username);
          this.router.navigate(["/"]);
        },
        err => {
          alert('Invalid Credentials')
        }
      );
  }

  // getResource(resourceUrl) : Observable<any> {
  //   var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer ' + this.cookie.getAuth()});
  //   return this.httpClient.get(resourceUrl, { headers: headers }).subscribe({})//.catch((error:any) => Observable.throw('Server error',error));
  // }

  saveToken(token: Token, username: string) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.store.dispatch(new UserActions.SetTokenAction(token));
    this.store.dispatch(new UserActions.SetCurrentUserAction(username));
    this.cookie.setAuth(token.access_token, token.expires_in);
  }

  logout() {
    this.cookie.deleteAuth();
    this.store.dispatch(new UserActions.DeleteTokenAction());
    this.store.dispatch(new UserActions.DeleteCurrentUserAction())
    //TODO: RESTORE STORE??
  }
}
