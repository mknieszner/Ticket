import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAppReducers from '../shared/store/app.reducers';
import {TaskInfoService} from '../shared/socket/task-info.service';
import {Client} from 'stompjs/lib/stomp.js';
import {Observable} from 'rxjs/Observable';
import {ChatMessageModel} from '../shared/chat-message.model';
import {DataStorageService} from '../shared/data-storage.service';
import * as ChatActions from "../shared/store/chat/chat.actions";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterContentChecked {
  @ViewChild('chatGlobalDiv') private chatGlobalDiv: ElementRef;
  @ViewChild('chatUserDiv') private chatUserDiv: ElementRef;
  chatContent: Observable<ChatMessageModel[]>;
  currentUser: Observable<string>;
  activeWsUsers: Observable<string[]>;
  username: string;
  chatName = 'global';


  constructor(private store: Store<fromAppReducers.AppState>,
              private ws: TaskInfoService,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.chatContent = this.store.select('chat', 'chatContent');
    this.currentUser = this.store.select('users', 'currentUser');
    this.currentUser.subscribe((username) => {
      this.username = username;
    });
    this.activeWsUsers = this.store.select('chat', 'activeUsers');
    this.dss.getActiveWsUsers();
  }

  ngAfterContentChecked(): void {
    if(this.chatGlobalDiv) {
      this.chatGlobalDiv.nativeElement.scrollTop = this.chatGlobalDiv.nativeElement.scrollHeight;
    }
    if(this.chatUserDiv){
      this.chatUserDiv.nativeElement.scrollTop = this.chatUserDiv.nativeElement.scrollHeight;
    }
  }

  postMessage(messageContent: string) {
    if (messageContent) {
      if (this.chatName === 'global') {
        this.ws.stompClient.send('/app/chat', {}, messageContent);
      } else {
        this.store.dispatch(new ChatActions.AppendChatWithMessage(new ChatMessageModel(this.username, messageContent, this.chatName)));
        this.ws.stompClient.send('/app/chat/' + this.chatName, {}, messageContent);
      }
    }
  }

  setChat(chatName: string) {
    this.chatName = chatName;
  }

}
