import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessagesService {

    private subject = new BehaviorSubject<string[]>([]);// krijojme nje string array bosh

    // i bejme subscribe array string nga asObservable dhe " async ", gjithashtu filtrojme ne bash te kushtit te me poshtem 
    errors$: Observable<string[]> = this.subject.asObservable().pipe(
        filter( messages => messages && messages.length > 0 ) // pranojme vetem string bosh, dhe ato qe kan me shum se nje shkronje
    );

    showErrors(...error: string[]) {
      this.subject.next(error);// shtojme string brenda array bosh
    }

}  