import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthCookie {
  constructor() {
  }

  static getAuth(): string {
    return Cookie.get('sticky');
  }

  static setAuth(value: string, expires: number): void {
    // 0.0138889//this accept day not minuts
    Cookie.set('sticky', value, expires);
  }

  static deleteAuth(): void {
    Cookie.delete('sticky');
  }
}
