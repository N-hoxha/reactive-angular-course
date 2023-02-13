import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from '../service/courses.service';


@Component({
  selector: 'course',
  templateUrl: './search-lessons.component.html',
  styleUrls: ['./search-lessons.component.css']
})
export class SearchLessonsComponent implements OnInit {

  searchResults$: Observable<Lesson[]>; // data store for array objekt

  activeLesson: Lesson; // data store for only one object 

  constructor(private coursesService: CoursesService) {


  }
 
  ngOnInit() {


  }

  onSearch(search: string) {

    this.searchResults$ = this.coursesService.searchLesson(search);

  }

  openLesson(lesson: Lesson) { // take lesson objekt
   console.log("take lesson objekt", lesson);
   this.activeLesson = lesson; // mbushim objektin
  }

  onBackToSearch() {
    this.activeLesson = null;  // fshim te dhenat 
  }
}











