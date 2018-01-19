import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserModel} from './user.model';
import {Store} from '@ngrx/store';
import {DataStorageService} from "../shared/data-storage.service";
import * as fromTableReducers from '../shared/store/tables.reducers'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: Observable<UserModel[]>;
  selectedUser: UserModel;

  constructor(private contentStore: Store<fromTableReducers.AppState>,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.users = this.contentStore.select('tables','users');
    this.dss.getUsers();
  }

  onSelectUser(user: UserModel) {
    this.selectedUser = user;
  }
}
