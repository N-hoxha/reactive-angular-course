
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()


// observable eshte nje lum te dhenash te cilat i regjistrojm diku dhe i therasim kur te kemi nevoj, 
// ne rastin e ketit servisi po e therasim " loading " vetem ne app.component.ts
export class LoadingService {

    // krijoj nje object i cili permban nje vler boolean loadingSubject: false 
    private loadingSubject = new BehaviorSubject<boolean>(false);  

    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    // <T> eshte nje  Generic Type Variables e cila perfaqeson te gjitha llojet e tipeve " number, string, any, boolean ", cdo gje
    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> { // marim nje array me objekte te cilin e bejme nje obserbavle 
        
        return of(null).pipe( // " of " : Converts the arguments to an observable sequence.
            // aktivizojme loadingOn() kur jemi duke thritur get data: "this.coursesService.loadAllCourse()"
            tap(() => this.loadingOn()), 
            concatMap(() => obs$), // " concatMap ": Returns an Observable that emits items based on applying a function, duke mar array me objekte dhe duke e bere emit prenda funksjonit showLoaderUntilCompleted i cili eshte observable
             // finalize() na mundeson mbylljen e array observable kur eshte succefully ose errors
            finalize(() => this.loadingOff()) 
        );
    }

    loadingOn() {
       // fleren fillestare boolean loadingSubject: false e ndryshojme e bejme true
       this.loadingSubject.next(true);
    }

    loadingOff() {
        // fleren fillestare boolean loadingSubject: true e ndryshojme e bejme false
       this.loadingSubject.next(false);
    }

}