import {
  HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HttpSentEvent,
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import * as fromAppReducers from './store/table/tables.reducers'
import {Store} from "@ngrx/store";
import {Token} from "./row.model";
import {Injectable} from "@angular/core";
import {OauthService} from "./oauth.service";
import {AuthCookie} from "./auth-cookies-handler";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookie: AuthCookie) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.cookie.getAuth()) {
      if (req.method == 'GET') {
        const headers = new HttpHeaders({'Content-type': 'multipart/form-data', 'Authorization': 'Bearer ' + this.cookie.getAuth()});
        // TODO'multipart/form-data' -> urlencoded??
        const updatedReq = req.clone({headers: headers});
        // console.log(updatedReq);
        return next.handle(updatedReq);
      } else {
        const headers = new HttpHeaders({'Content-type': 'application/json','Authorization': 'Bearer ' + this.cookie.getAuth()});
        const updatedReq = req.clone({headers: headers});
        // console.log(updatedReq);
        return next.handle(updatedReq);
      }
    } else {
      return next.handle(req);
    }
  }
}
