import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {WebSocketService} from "./web-socket.service";
import {Client} from 'stompjs/lib/stomp.js';



@Injectable()
export class TaskInfoService {
  constructor(private wsService: WebSocketService) {
  }

  getClient(): Client {
      return this.wsService.connect()
  }
}
