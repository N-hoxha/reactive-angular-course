import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { CoursesService } from '../service/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../service/courses.store';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;
    course:Course; 

    constructor(
        // private loadingService: LoadingService,
        // private coursesService: CoursesService, 
        // private messagesService: MessagesService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        // course:Course perfaqeson objektin me te dhana qe marim nga funkjoni editCourse(course: Course) { " home.component.ts " 
        @Inject(MAT_DIALOG_DATA) course:Course,
        private coursesStore: CoursesStore
    ) {  

        this.course = course;

        this.form = fb.group({ 
            // te dhenat brenda objektin, i bashkangjisim brenda inputeve specifike
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    save() { 
     
     const changes = this.form.value; // marim te gjith form grupin 

     this.coursesStore.saveCourse(this.course.id, changes).subscribe();
     
     this.dialogRef.close(); // mbullim djalogun
    //  this.dialogRef.close(changes);


    //  const saveCourse$ = this.coursesService.saveCourse(this.course.id, changes)
    //                      .pipe(
    //                         catchError(err => {
    //                             const message = "Could not save course";
    //                             console.log(message, err);
    //                             this.messagesService.showErrors(message);
    //                             return throwError(err);
    //                         })
    //                      );

    //  this.loadingService.showLoaderUntilCompleted(saveCourse$)
    //     .subscribe((response: any) => {
    //        console.log("response when save change by id", response);
    //        this.dialogRef.close(response);
    //  });
     
      
    }
 
    close() {
        this.dialogRef.close();
    }

}
