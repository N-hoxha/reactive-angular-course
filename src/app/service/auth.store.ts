import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { User } from "../model/user";

const AUTH_DATA = "auth_data"; // ** do bejme testime ta vendosim brenda export class, cfare ndodhe


@Injectable({
    providedIn: 'root'
})

export class AuthStore {

    // null sepse fillon nga vlera fillestare dhe null meaning that the user not yet authenticatied
    private subject = new BehaviorSubject<User>(null);
    user$: Observable<User> = this.subject.asObservable();

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor( private http: HttpClient ) {

        // A double NOT !! is sometimes used for converting a value to boolean type:
        this.isLoggedIn$ = this.user$.pipe( 
            tap((user: any) => { // lexojme objektin ka vlera brenda 

                // nese objekti ka vlera brenda -> !!user == true, rejdh qe -> this.isLoggedIn$ = true
                // nese objekti nuk ka vlera brenda ( user= "" or null) -> !!user == false, rejdh qe -> this.isLoggedIn$ = false
                console.log("this.isLoggedIn$ user",user);            
                console.log("this.isLoggedIn$ !!user", !!user);
            }), 
            map(user => !!user)
        );

        // this.isLoggedOut$ = this.isLoggedIn$ = true
        // nese !this.isLoggedOut$ = false
        // dhe anasjelltas // this.isLoggedOut$ = this.isLoggedIn$ = false
        // nese !this.isLoggedOut$ = true

        this.isLoggedOut$ = this.isLoggedIn$.pipe( 
            tap(loggedIn => {
                console.log("this.isLoggedOut$ loggedIn", loggedIn);
                console.log("this.isLoggedOut$ !loggedIn", !loggedIn);
            }),
            map(loggedIn => !loggedIn)
        );

        const user = localStorage.getItem(AUTH_DATA);  // marim obejktin ne localStorage 

        if (user) { // nese user
            this.subject.next(JSON.parse(user)); // e stojme brenda subjektit si obejkt
        }
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>("/api/login", {email, password}).pipe(
            tap(user => { 
                this.subject.next(user); // shtojme brena objektin vleren " {email: 'test@angular-university.io'} "
                localStorage.setItem(AUTH_DATA, JSON.stringify(user)); // gjithashtu e regjistrojme objektin edhe ne localStorage
                console.log("Response data when login user in SERVISE", user); 
            }),
            shareReplay()
        );
    }

    logout() {
        // fshim objektin user si ne observable dhe ne localStorage
       this.subject.next(null);
       localStorage.removeItem(AUTH_DATA);
    }


}