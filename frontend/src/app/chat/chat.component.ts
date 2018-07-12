import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
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
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterContentChecked, OnDestroy {
  @ViewChild('chatGlobalDiv') private chatGlobalDiv: ElementRef;
  @ViewChild('chatUserDiv') private chatUserDiv: ElementRef;
  chatContent: Observable<ChatMessageModel[]>;
  currentUser: Observable<string>;
  activeWsUsers: Observable<string[]>;
  public unreadMessages = new Map<string,boolean>();
  username: string;
  chatName: string;
  private messages: ChatMessageModel[] = [];
  private chatNameState: Observable<string>;


  constructor(private store: Store<fromAppReducers.AppState>,
              private ws: TaskInfoService,
              private dss: DataStorageService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.unreadMessages.set('global', false);
    this.store.dispatch(new ChatActions.SelectChat('global'));
    this.chatContent = this.store.select('chat', 'chatContent');
    this.chatNameState = this.store.select('chat', 'selectedChat');
    this.chatNameState.subscribe(chatName => this.chatName = chatName);
    this.chatContent.subscribe(chat => {
      this.messages = chat;
      if(this.messages.length > 0){
        if(this.messages[this.messages.length-1].recipientName === 'global' && this.chatName !== 'global'){
          this.unreadMessages.set('global', true);
        }
        if(this.messages[this.messages.length-1].recipientName !== 'global'
          && this.chatName !== this.messages[this.messages.length-1].senderName){
          this.unreadMessages.set(this.messages[this.messages.length-1].senderName, true);
        }
      }
    });
    this.currentUser = this.store.select('users', 'currentUser');
    this.currentUser.subscribe((username) => {
      this.username = username;
    });
    this.activeWsUsers = this.store.select('chat', 'activeUsers');
    this.activeWsUsers.subscribe(users => {
      users.forEach(user => {
        if(!this.unreadMessages.has(user)) {
          this.unreadMessages.set(user, false);
        }
      })
    });
    this.dss.getActiveWsUsers();
    this.route.queryParams.subscribe(params => {
      if (this.messages.length > 0) {
        this.setChat(this.messages[this.messages.length - 1].recipientName !== 'global' ? params.user : 'global');
      }
    })
  }

  ngAfterContentChecked(): void {
    if (this.chatGlobalDiv) {
      this.chatGlobalDiv.nativeElement.scrollTop = this.chatGlobalDiv.nativeElement.scrollHeight;
    }
    if (this.chatUserDiv) {
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
    this.unreadMessages.set(chatName,false);
    this.store.dispatch(new ChatActions.SelectChat(chatName));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ChatActions.SelectChat(''))
  }

}
