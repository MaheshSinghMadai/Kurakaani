import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${environment.apiUrl}/chat`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();

  public messages$ = new BehaviorSubject<any>([]);
  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];

  constructor() {
    this.start();
    this.connection.on(
      'ReceiveMessage',
      (user: string, message: string, messageTime: string) => {
        this.messages = [...this.messages, { user, message, messageTime }];
        this.messages$.next(this.messages);
      }
    );

    this.connection.on('ConnectedUser', (users: any) => {
      this.connectedUsers$.next(users);
    });
  }

  //start connection
  public async start() {
    try {
      await this.connection.start();
      console.log('Connection is established!');
    } catch (error) {
      console.log(error);
    }
  }

  //Join Room
  public async joinRoom(user: string, room: string) {
    return this.connection.invoke('JoinRoom', { user, room });
  }

  // Send Messages
  public async sendMessage(message: string) {
    return this.connection.invoke('SendMessage', message);
  }

  //leave
  public async leaveChat() {
    return this.connection.stop();
  }
}
