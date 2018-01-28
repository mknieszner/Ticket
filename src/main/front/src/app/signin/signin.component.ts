import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {OauthService} from "../shared/oauth.service";
import {AuthCookie} from "../shared/auth-cookies-handler";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private oauthservice: OauthService,
              private cookie: AuthCookie,) {

  }

  ngOnInit() {
    this.cookie.deleteAuth();
    this.signinForm = new FormGroup({
      'username' : new FormControl(),
      'password' : new FormControl()
    })
  }

  onSignin(){
    this.oauthservice.obtainAccessToken({
      username: this.signinForm.value.username,
      password: this.signinForm.value.password
    });
  }
}
