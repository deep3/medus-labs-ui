import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class ErrorDataService  {

private errorCodeMS = new BehaviorSubject(null);
private errorTitleMS = new BehaviorSubject(null);
private errorBodyMS = new BehaviorSubject(null);

errorCode = this.errorCodeMS;
errorTitle = this.errorTitleMS;
errorBody = this.errorBodyMS;

  constructor() {}

    /**
     * Method that provides a means of sending the Error Model via this service
     * @param errorModel The Error Model to send
     */
    sendErrorModel(errorModel) {
        this.errorCodeMS.next(errorModel.httpStatus);
        this.errorTitleMS.next(errorModel.errorTitle);
        this.errorBodyMS.next(errorModel.errorMessage);
    }
}
