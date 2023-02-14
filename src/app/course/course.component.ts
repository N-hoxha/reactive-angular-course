import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, catchError
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, throwError, combineLatest} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from '../service/courses.service';


interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {

  // course$: Observable<Course>;

  // lessons$: Observable<Lesson[]>;

  data$: Observable<CourseData>;

  constructor( 
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {


  }

  ngOnInit() {
   
    this.takeDataObjetById();
  }

  takeDataObjetById() {
       // marim id nga url e cila eshte nje string dhe e kthejme ne integer me sintaksen parseInt 
       const takeCourseId = parseInt(this.route.snapshot.paramMap.get("courseId"));

       // startWith -> shton vleren ne index 0 te nje array, ne kete rast null, sepse eshte objekt dhe duam ti fshim te dhenat pasi kemi mbarur pun me to 
       const course$ = this.coursesService.loadCourseById(takeCourseId).pipe( startWith(null) );

       const lessons$ = this.coursesService.loadAllCourseLessons(takeCourseId).pipe( startWith([]) );

       // combineLatest -> bashkon nje objekt dhe nje array me objekt ne nje objekt te vetem te cilin e quajme CourseData
       this.data$ = combineLatest([course$, lessons$]).pipe( 
        map(([course, lessons]) => {
          return {
            course,
            lessons
          }
        }),
        tap(data => console.log("baind two observable inside one object", data))
       );
  }


}











