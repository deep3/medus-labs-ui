import { Component, OnInit } from '@angular/core';
import { ErrorDataService  } from '../../data-service/error-data.service';
@Component({
  templateUrl: 'GenericError.component.html'
})

export class GenericErrorComponent implements OnInit {

    errorCode: string;
    errorTitle: string;
    errorBody: string;

  constructor(private errorDataS: ErrorDataService) {}

  ngOnInit(): void {
    this.errorDataS.errorCode.subscribe(val => {
        this.errorCode = val;
      });
    this.errorDataS.errorTitle.subscribe(val => {
        this.errorTitle = val;
    });
    this.errorDataS.errorBody.subscribe(val => {
        this.errorBody = val;
    });
  }

}
