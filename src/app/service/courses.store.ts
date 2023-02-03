
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { Course, sortCoursesBySeqNo } from '../model/course';

@Injectable({
    providedIn: 'root'
})

export class CoursesStore {

    private subject = new BehaviorSubject<Course[]>([]); // krijojme nje array Observable bosh

    courses$: Observable<Course[]> = this.subject.asObservable(); // array - object == me subscribe == " beginnerCourses$ | async ", ku subscribe eshte async ne html

    constructor (
        private http: HttpClient,
        private loadingService: LoadingService,
        private messagesService: MessagesService,
     ) {
         this.loadAllCourses();
    } 

    private loadAllCourses() {

      const loadCourses$ = this.http.get<Course[]>('/api/courses') // marim { payload:[ { me 14 objekte } ] }
        .pipe( // per ta ber rrjedhjen me te lexushme modifikoj reshtin e datave ne [ { me 14 objekte } ]
               map(res => res["payload"]),
               catchError(err => { // kapim cfare do lloj errori
                    const message = "Could not load courses";
                    this.messagesService.showErrors(message); // mbushim nje string array me mesazhin "Could not load courses"
                    console.log(message, err);
                    return throwError(err); // errorin qe kapim e bejme emit brenda sintakses catchError, ecila na shfaqet ne " CONSOLE "
                }),// array objekt qe marim nga servisi e bashkagjisim ne array Observable " subject = new BehaviorSubject<Course[]>([]) "
                tap( courses =>this.subject.next(courses)) // ku vlerat i therasin diferencojme brenda "  filterByCategory ", per ti shfaqur ne " home.component.ts "
       );

       this.loadingService.showLoaderUntilCompleted(loadCourses$)
          .subscribe((response: any) => {
            console.log(" this.loadingService.showLoaderUntilCompleted ", response);
           });

    }

    // Partial< perfaqeson: string, number, boolean, any > qe permban objekti " Course "
    saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {

        // ---------------------------------------------------- 
        // MODIFIKOJME ARRAY OBJEKT OBSERVABLE I CILI REGJISTRON CDO MODIFIKIM NE KOHE REALE 
        // KY MODIFIKIM NA NDIMON QE ENDPOINTIN GET " const loadCourses$ ", TA THERASIM VETEM NJE HERE DUKE E REGJISTURAR NE ARRAY OBJEKT OBSERVABLE
        // DHE KUR JEMI DUKE MODIFIKUR NJE OBEJKTE BRENDA ARRAY, ENDPONTI GET TE MOS THERITET 
        // SEPSE NESE THERITET FAQA DUHET TE BEHET RELOAD, DHE KJO NGADALSON SHPJETESIN E APPLICATION 
        // KESHTU REGJISTOJME TE GJITHA TEDHENAT NE ARRAY OBEJT OBSERVABLE, DHE NUK KEMI PSE TI BEJME RELOAD FAQES PER TE NA SHFAQUR NE DHENAT 
        // NGA SINTAKSA "  (coursesChanges)="reloadCourses()" "

        const courses = this.subject.getValue(); // marim array objectin [ { me 14 objektet } ]

        console.log(" const courses = this.subject.getValue() " , courses);

        // me ndimen e id gjeme index e objektit qe po modifikojme
        const index = courses.findIndex(course => course.id == courseId); 

        console.log(" course.id == courseId ", index);

        // nga indeksi qe gjetem diferencojme objektin nga 13 obejktet e tjera
        console.log("...courses[index]", courses[index]);

        console.log(" ...changes", changes); // marim FormGroup me te gjith te dhenat qe po i bejme edit

        // bashkangjisim objektin e pamodifikur, me FormGroup i cili permban vlera te modifikuara 
        const newCourse: Course = { 
            ...courses[index], 
            ...changes,
        };
       
        // rezultati, modifikojme objektin me ndimen e index dhe FormGroup
        console.log("newCourse", newCourse);
       
        // therasim ARRAY OBJEKTIN I CILI NUK ESHTE MODIFIKUR AKOMA " [ { me 14 objekt brenda } ] "
        const newCourses: Course[] = courses.slice(0);

        // terheqim vetem objektin me ndimen e index i cili NUK ESHTE I MODIFIKUAR
        console.log("newCourses[index]", newCourses[index]);

        // return;

        // bashkangjisimin OBJEKTIN E PA MODIFIKUR ME ATE TE MODIFIKUR  
        newCourses[index] = newCourse;

        // modifikojme ARRAY OBJEKTIN E RI qe po i bejem update
        console.log("newCourses", newCourses);

        this.subject.next(newCourses); // ndryshimet i rujme breda OBSERVABLE

        //  --------------------------------------------------------

        // objekt id == courseId dhe changes == FormGroup
        return this.http.put(`/api/courses/${courseId}`, changes).pipe(
            catchError(err => {
                const message = "Could not save course";
                console.log(message, err);
                this.messagesService.showErrors(message);
                return throwError(err);
            }),
            shareReplay()
          );

    }


    // NDAJME ARRAY OBJEKTIN NE "ADVANCED" DHE "BEGINNER" dhe i shfaqim ne " home.component.ts "
    filterByCategory(category: string): Observable<Course[]> {

        // pra " this.courses$ " eshte array objekti te cilin e mushim ne funkjonin " loadAllCourses ", nga " tap( courses => this.subject.next(courses)) "
        return this.courses$.pipe(

            // nga array/object " map ", na mundeson te kapim objektin e par, ku per cdo objekt qe filtrohet kemi nje kusht " course.category == "BEGINNER" OR "ADVANCED" "
            // te cilet objektet renditet si pas radhes se numrave te array/object - c1.seqNo " sort(sortCoursesBySeqNo) ". 
            map( courses => courses.filter(course => course.category == category).sort(sortCoursesBySeqNo))
            
        );

    }

   


}