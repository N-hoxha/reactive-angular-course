import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CoursesService } from '../service/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../service/courses.store';


@Component({
  selector: 'home', 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit { 

  beginnerCourses$: Observable<Course[]>;
   
  advancedCourses$: Observable<Course[]>;


  constructor(  
    // private coursesService: CoursesService,
    // private loadingService: LoadingService,
    // private messagesService: MessagesService,
    private coursesStore: CoursesStore
  ) {

  }

  ngOnInit() {

    this.reloadCourses();  

  } 

  reloadCourses() {


    this.beginnerCourses$ = this.coursesStore.filterByCategory("BEGINNER");
    this.advancedCourses$ = this.coursesStore.filterByCategory("ADVANCED");

    // -----------------------------------------------------------------------------------------------

    // const courses$ = this.coursesService.loadAllCourse().pipe(
    //   map( courses => courses.sort(sortCoursesBySeqNo)), 
    //   catchError(err => { 
    //     const message = "Could not load courses";
    //     this.messagesService.showErrors(message); 
    //     console.log(message, err);
    //     return throwError(err);  
    //   })
    // );

    // const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$); 

   
    //  this.beginnerCourses$ = loadCourses$.pipe(
    //   tap(data => console.log("data BEGINNER", data)),
    //   map( courses => courses.filter(course => course.category == "BEGINNER"))
    //  );
  
    //  this.advancedCourses$ = loadCourses$.pipe(
    //   map( courses =>  courses.filter(course => course.category == "ADVANCED"))
    //  );

  // --------------------------------------------------------------------------------------------------------

  // this.http.get('/api/courses')
  //   .subscribe(
  //     res => {
       
  //       // res == { payload: Array(14) }
  //       //  res["payload"] == [ {..}, {..}, ... {..} ] -> 14 objekte brenda array 
  //       //  duke qen se " res["payload"] " eshte nje array me objekte brenda, ku .sort(): 
  //       //  na mundesojme te kryejme nje funksjonin " sortCoursesBySeqNo "
  //       // i cili na drentit objekte nga me i vogli te me i madhi. 
  //       const courses: Course[] = res["payload"].sort(sortCoursesBySeqNo);

  //       // filter i ben return nje array duke kryer nje funkjon brenda kllapave
  //       // ne rastin ton po diferencojme objketet qe e kan course.category == "BEGINNER" me course.category == "ADVANCED"
  //       this.beginnerCourses = courses.filter(course => course.category == "BEGINNER"); // 11 objekte brenda array
  //       this.advancedCourses = courses.filter(course => course.category == "ADVANCED"); // 3 objekte brenda array

  //       console.log("this.beginnerCourses", this.beginnerCourses);
  //       console.log("this.advancedCourses", this.advancedCourses); 
  //     });

  // -------------------------------------------------------------------------------------------------------------

  }

 

}




