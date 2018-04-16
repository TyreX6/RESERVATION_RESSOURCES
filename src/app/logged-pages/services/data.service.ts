import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';

import { Socket } from '../models/interfaces';

declare var io : {
  connect(url: string): Socket;
};

@Injectable()
export class DataService {

  socket: Socket;
  observer: Observer<any>;

  getQuotes() : Observable<any> {
    this.socket = socketIo('http://localhost:8080');

    this.socket.on('data', (res) => {
      this.observer.next(res);
    });

    return this.createObservable();
  }

  getNotification() : Observable<any> {
    this.socket = socketIo('http://localhost:8080');

    this.socket.on('data', (res) => {
      this.observer.next(res);
    });

    return this.createObservable();
  }

  createObservable() : Observable<any> {
      return new Observable<any>(observer => {
        this.observer = observer;
      });
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        let errMessage = error.error.message;
        return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }

}
