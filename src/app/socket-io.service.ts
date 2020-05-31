import { Observable, Subscriber } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  socket: any;
  uri: string = 'ws://localhost:3000';
  constructor() {
    
  }

  listen(eventName: string,user_id:string){
    this.socket = io(this.uri,{query:"name="+user_id});
    return new Observable((Subscriber) =>{
      this.socket.on(eventName,(data) => {
        Subscriber.next(data);
      })
    })
  }

}
