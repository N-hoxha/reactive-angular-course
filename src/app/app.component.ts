import {Component, OnInit} from '@angular/core';
import { LoadingService } from './loading/loading.service';


// e shtojme providers LoadingService specifikisht ne kete komponent HOME, 
// qe spinner te behet reload vetem ne kete faqe, nese do ta shtonim ne app.module.ts,
// spinner do beher reload edhe per faqe te tjera.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoadingService
  ]
})
export class AppComponent implements  OnInit {

    constructor() {

    }

    ngOnInit() {


    }

  logout() {

  }

}
