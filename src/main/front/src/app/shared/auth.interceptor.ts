import {
  HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HttpSentEvent,
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {AuthCookie} from "./auth-cookies-handler";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookie: AuthCookie) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    console.log('intercept');
    console.log(req);
    if (this.cookie.getAuth()) {
      console.log('this.cookie.getAuth()',this.cookie.getAuth())
      if (req.method == 'GET') {
        const headers = new HttpHeaders({'Content-type': 'multipart/form-data', 'Authorization': 'Bearer ' + this.cookie.getAuth()});
        // TODO'multipart/form-data' -> urlencoded??
        const updatedReq = req.clone({headers: headers});
        return next.handle(updatedReq);
      } else {
        const headers = new HttpHeaders({'Content-type': 'application/json','Authorization': 'Bearer ' + this.cookie.getAuth()});
        const updatedReq = req.clone({headers: headers});
        return next.handle(updatedReq);
      }
    } else {
      console.log('else' + req)
      return next.handle(req);
    }
  }
}
