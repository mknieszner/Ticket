import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import * as fromAppReducers from '../shared/store/app.reducers'
import {DataStorageService} from "../shared/data-storage.service";
import {UserModel} from "../user/user.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  usernameState: Observable<string>;
  usernDetailsState: Observable<UserModel>;
  userDetails: UserModel;
  editMode: boolean = false;
  resetPasswordMode: boolean = false;

  constructor(private store: Store<fromAppReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.usernameState = this.store.select('users', 'currentUser');
    this.usernDetailsState = this.store.select('users', 'currentUserDetails');
    this.usernDetailsState.subscribe((user: UserModel) => {
      console.log('user', user);
      this.userDetails = user
    });
    this.usernameState.subscribe((username: string) => {
      this.dss.getCurrentUser(username);
    });
  }

  toggleEdidMode() {
    this.editMode = !this.editMode;
  }

  togglePasswordResetMode() {
    this.resetPasswordMode = !this.resetPasswordMode;
  }

  updateUser(formValue: { firstName, lastName, email }) {

    this.dss.updateUser({
      username: this.userDetails.username,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      passowrd: '', // TODO: remove password from user details on Tickets!
      email: formValue.email,
      enabled: false,
      roleNames: [],
      taskDtos: [],
    });
  }

  updatePassword(formValue: { oldPassword, newPassword, confirmPassword }) {
    if (formValue.newPassword == formValue.confirmPassword && formValue.newPassword.length >1) {
      this.dss.updatePassword(formValue.oldPassword,formValue.newPassword, this.userDetails.username);
    } else {
      console.log("Passwords do not match!")
    }
  }
}
