import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {OauthService} from "../shared/oauth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private oauthservice: OauthService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'username' : new FormControl(),
      'password' : new FormControl()
    })
  }

  onSignin(){
    this.oauthservice.obtainAccessToken({username:this.signinForm.value.username, password:this.signinForm.value.password});
  }
}
