
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Lesson } from '../model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient ) { }

  // shareReplay() -> minimizon observable subscription ne XHR Network, nese e fshim do na paraqiten 2,
  // sepse kemi 2 subscription, this.beginnerCourses$ dhe this.advancedCourses$

  //  loadAllCourse(): Observable<Course[]> {
  //    return this.http.get<Course[]>('/api/courses')
  //     .pipe( 
  //       map(res => res["payload"]),
  //       shareReplay()
  //      );
  //  }

  //  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
  //   return this.http.put(`/api/courses/${courseId}`, changes).pipe(
  //     shareReplay()
  //   );
  //  }

  searchLesson(search: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lessons', {
      params: {
        filter: search,
        pageSize: "100"
      }
    }).pipe(
      map(res => res["payload"]),
      shareReplay()
    );
  }

} 
