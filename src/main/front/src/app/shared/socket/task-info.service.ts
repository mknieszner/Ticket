import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {WebSocketService} from "./web-socket.service";
import {Client} from 'stompjs/lib/stomp.js';



@Injectable()
export class TaskInfoService {
  public stompClient: Client;
  constructor(private wsService: WebSocketService) {
  }

  getClient(): Client {
    this.stompClient = this.wsService.connect();
      return this.stompClient;
  }
}
