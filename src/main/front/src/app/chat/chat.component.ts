import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromAppReducers from '../shared/store/app.reducers';
import {TaskInfoService} from "../shared/socket/task-info.service";
import {Client} from 'stompjs/lib/stomp.js';
import {Observable} from "rxjs/Observable";
import {ChatMessageModel} from "../shared/chat-message.model";
import {UserModel} from "../user/user.model";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatContent: Observable<ChatMessageModel[]>;
  currentUser: Observable<string>;
  username: string;


  constructor(private store: Store<fromAppReducers.AppState>,
              private ws: TaskInfoService) {
  }

  ngOnInit() {
    this.chatContent = this.store.select('chat', 'chatContent');
    this.currentUser = this.store.select('users','currentUser');
    this.currentUser.subscribe((username) => {
      this.username = username;
    })
  }

  postMessage(messageContent: string) {
    this.ws.stompClient.send('/app/chat',{}, messageContent);
  }
}
