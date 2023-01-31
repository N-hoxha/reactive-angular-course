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

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [
        LoadingService,
        MessagesService
    ]
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;
    course:Course; 

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        // course:Course perfaqeson objektin me te dhana qe marim nga funkjoni editCourse(course: Course) { " home.component.ts " 
        @Inject(MAT_DIALOG_DATA) course:Course,
        private coursesService: CoursesService, // course:Course perfaqeson 
        private loadingService: LoadingService, // ne fshim provides, shfaq eror sepse e kimi lidhur vetem te app.componet.ts i cili perfaqeson vetem nje komponetet ne " router-outlet ", jo te gjitha komponentet
        private messagesService: MessagesService
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
     // marim ndryshimet nga FormGroup
     const changes = this.form.value;

     const saveCourse$ = this.coursesService.saveCourse(this.course.id, changes)
                         .pipe(
                            catchError(err => {
                                const message = "Could not save course";
                                console.log(message, err);
                                this.messagesService.showErrors(message);
                                return throwError(err);
                            })
                         )

     this.loadingService.showLoaderUntilCompleted(saveCourse$).subscribe((response: any) => {
        console.log("response when save change by id", response);
        // objektin e vlerave qe dergojme ne servis i dergojme edhe ne funksjonin dialogRef te courses-card-list.component.ts
        // ku me ndimen e tap() aktivizojme nje fuksjon bosh " this.coursesChanges.emit() ", i cili
        // na mundson ti bej reloud funkjonit (coursesChanges)="reloadCourses()" ne home.component.html
        this.dialogRef.close(response);
     })
     
      
    }
 
    close() {
        this.dialogRef.close();
    }

}
