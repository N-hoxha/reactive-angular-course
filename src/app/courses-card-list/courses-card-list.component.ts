import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter, tap } from 'rxjs/operators';

import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { Course } from '../model/course';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss']
})
export class CoursesCardListComponent implements OnInit  {

  @Input() courses: Course[] = [];

  // @Output() coursesChanges = new EventEmitter();

  constructor( private dialog: MatDialog ) {}

  ngOnInit() { 
       
  }

   // marim vetem objektin specifik qe duam
   editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig(); 

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    // objektin specifik e trasportojme ne componentin CourseDialogComponent
    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    
    // dialogRef.afterClosed() mer listen e tedhenave nga this.dialogRef.close(changes);
    // funksjoni i meposhtem eshte nje shembull si trasferohen tedhenat nga nje komponent ne tjerin
 
    dialogRef.afterClosed().pipe( 

      filter( val => !!val), 
     ).subscribe((data: any) => {
      console.log("response after close the dialog", data);
    });

  }

}
