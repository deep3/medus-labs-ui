import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class UserManagementDataService  {

private usernameDataMessageSource = new BehaviorSubject(null);
private userIdDataMessageSource = new BehaviorSubject(null);

  usernameData = this.usernameDataMessageSource;
  userIdData = this.userIdDataMessageSource;

  constructor() {}

    /**
     * Sends username data via this service
     * @param usernameData The data
     */
    sendNameData(usernameData) {
        this.usernameDataMessageSource.next(usernameData);
    }

     /**
     * Sends userID data via this service
     * @param userIdData The data
     */
    sendIdData(userIdData) {
        this.userIdDataMessageSource.next(userIdData);
    }

    /**
     * Method that provides a means of sending the user Model via this service
     * @param errorModel The User Model to send
     */
    sendModel(userModel) {
        if (userModel != null) {
            this.userIdDataMessageSource.next(userModel.id);
            this.usernameDataMessageSource.next(userModel.username);
        }
    }

}

