import {
  AfterViewChecked,
  Component,
  ElementRef, OnDestroy,
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
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('chatDiv') private chatDiv: ElementRef;
  chatContent: Observable<ChatMessageModel[]>;
  currentUser: Observable<string>;
  activeWsUsers: Observable<string[]>;
  public unreadMessages = new Map<string, boolean>();
  public messagesMap = new Map<string, ChatMessageModel[]>();
  username: string;
  chatName: string;
  chatNameState: Observable<string>;


  constructor(private store: Store<fromAppReducers.AppState>,
              private ws: TaskInfoService,
              private dss: DataStorageService) {
  }

  ngOnInit() {
    this.dss.getActiveWsUsers();
    this.unreadMessages.set('global', false);
    this.messagesMap.set('global', []);
    this.store.dispatch(new ChatActions.SelectChat('global'));
    this.chatContent = this.store.select('chat', 'chatContent');
    this.chatNameState = this.store.select('chat', 'selectedChat');
    this.chatNameState.subscribe(chatName => {
      this.chatName = chatName
    });
    this.activeWsUsers = this.store.select('chat', 'activeUsers');
    this.activeWsUsers.subscribe(users => {
      users.forEach(user => {
        if (!this.unreadMessages.has(user)) {
          this.unreadMessages.set(user, false);
          this.messagesMap.set(user, []);
        }
      })
    });
    this.chatContent.subscribe(chat => {
      this.mapLastToRespectiveChat(chat);
      if (chat.length > 0) {
        if (chat[chat.length - 1].recipientName === 'global' && this.chatName !== 'global') {
          this.unreadMessages.set('global', true);
        }
        if (chat[chat.length - 1].recipientName !== 'global'
          && this.chatName !== chat[chat.length - 1].senderName) {
          this.unreadMessages.set(chat[chat.length - 1].senderName, true);
        }
      }
    });
    this.currentUser = this.store.select('users', 'currentUser');
    this.currentUser.subscribe((username) => {
      this.username = username;
    });
    this.store.select('chat', 'chatContent')
      .subscribe(chat => {
        console.log("init", chat);
        this.fillInitially(chat)
      }).unsubscribe();
  }

  ngAfterViewChecked(): void {
    if (this.chatDiv) {
      this.chatDiv.nativeElement.scrollTop = this.chatDiv.nativeElement.scrollHeight + 20;
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ChatActions.SelectChat(''))
  }

  setChat(chatName: string) {
    this.unreadMessages.set(chatName, false);
    this.store.dispatch(new ChatActions.SelectChat(chatName));
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

  private fillInitially(chat: ChatMessageModel[]) {
    this.messagesMap.forEach((value, key) => this.messagesMap.set(key, []));
    if (chat.length > 0) {
      chat.forEach((value) => {
        const chatName = value.recipientName === 'global'
          ? 'global'
          : value.senderName === this.username
            ? value.recipientName
            : value.senderName;
        this.messagesMap.set(chatName, [...this.messagesMap.get(chatName), value]);
      })
    }
  }

  private mapLastToRespectiveChat(chat: ChatMessageModel[]) {
    if (chat.length > 0) {
      const chatName = chat[chat.length - 1].recipientName === 'global'
        ? 'global'
        : chat[chat.length - 1].senderName === this.username
          ? chat[chat.length - 1].recipientName
          : chat[chat.length - 1].senderName;
      this.messagesMap.set(chatName, [...(this.messagesMap.get(chatName) || []), chat[chat.length - 1]]);
    }
  }
}
