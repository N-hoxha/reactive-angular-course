import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  // e bejme loadingService public ku te kemi mundesi ta perdorim ne HTML
  constructor( public loadingService: LoadingService ) {

  }

  ngOnInit() {

    this.loadingService.loading$.subscribe(data => console.log("spinner data response", data));

  }


}
