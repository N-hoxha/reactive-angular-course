import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessagesService {

    private subject = new BehaviorSubject<string[]>([]);// krijojme nje string array bosh

    errors$: Observable<string[]> = this.subject.asObservable().pipe(
        filter( messages => messages && messages.length > 0 ) // marim ato messaz boshe dhe mesazhin me vlera
    );

    showErrors(...error: string[]) {
      this.subject.next(error);
    }

} 