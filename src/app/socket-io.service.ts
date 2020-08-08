import { Observable, Subscriber } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  socket: any;
  //uri: string = 'ws://localhost:3000';
  //uri: string = 'ws://128.199.232.222';
  //uri: string = 'ws://smartflowfarm.xyz';
  //uri: string = 'https://128.199.232.222:3001';
  //uri: string = 'http://128.199.232.222:3000';
  //uri: string = 'ws://smartflowfarm.xyz';
  //uri: string = 'http://127.0.0.1:3000';
  //uri: string = 'http://localhost:3000';
  //uri: string = 'https://localhost:3001';
  //uri: string = 'http://188.166.248.109:3000';
  //uri: string = 'https://188.166.248.109:3001';
  uri: string = 'https://smartflowfarm.info:3001';
  constructor() {
    
  }

  listen(eventName: string,user_id:string){
    //this.socket = io(this.uri,{query:"name="+user_id});
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    this.socket = io.connect(this.uri,{query:{roomname:user_id,name:genRanHex(16)},transports : ['websocket','polling'],secure: true,reconnection: true});
    this.socket.emit('join room', user_id);
    return new Observable((Subscriber) =>{
      this.socket.on(eventName,(data) => {
        Subscriber.next(data);
      })
      this.socket.on('disconnect', function(){
        //console.log('disconnected', this)
        //this sets whether the re connection is allowed or not
        this.io._reconnection = true;
      });
      this.socket.on('reconnect', (error, callback) => {
        this.socket = io.connect(this.uri,{query:{roomname:user_id,name:genRanHex(16)},transports : ['websocket','polling'],secure: true,reconnection: true});
        this.socket.emit('join room', user_id);
        this.socket.on(eventName,(data) => {
          Subscriber.next(data);
        })
        //console.log('reconnect succesfully', this);
      });
    })
  }

  disconnect(){

    console.log('disconnected', this)
    return this.socket.disconnect();

  }

}
 