import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { ModalOptionsComponent } from '../modal/modal-options';
import { Router} from '@angular/router';
import { UserManagementDataService } from '../../data-service/user-management-data.service';
import { ErrorDataService } from '../../data-service/error-data.service';
import { UsersApiService } from '../../api/user/users-api.service';
declare var PassPlexityValidation: any;

@Component({
  templateUrl: 'edit.component.html'
})

export class EditComponent implements OnInit, OnDestroy {

  userId: string;
  userData: any;
  resData: any;
  userModifyModel: any = {};
  returnedUsername = 'Username';
  user: any;
  creationCheck: boolean;
  formValid: boolean;

  constructor(private router: Router,
              private api: UsersApiService,
              private data: UserManagementDataService,
              private modal: ModalOptionsComponent,
              private errordDataS: ErrorDataService
             ) {
  }

  ngOnInit() {
    this.getUserData();
    PassPlexityValidation.applyPassPlexity();
    if (this.userId != null) {
      this.creationCheck = false;
    } else {
      this.creationCheck = true;
    }
  }

  ngOnDestroy() {
    this.resetData();
    this.userModifyModel = null;
    this.creationCheck = null;
  }

  /**
   * Method executed when form submitted
   */
  onSubmit() {

    if (this.validate()) {
      if (this.userId != null) {
        this.userModifyModel.id = this.userId;
        Promise.resolve(this.api.getUserExists(this.userModifyModel.username)
        .then( res => {
          this.resData = res;

          if (this.resData.content[0] == null) {
            this.modifyUser();
          } else {
            try {
              if (this.resData.content[0].id === this.userModifyModel.id) {
                this.modifyUser();
              }
            } catch (e) {
              this.failure();
            }
          }
        })
      );

      } else {
        Promise.resolve(this.api.getUserExists(this.userModifyModel.username.toString())
        .then( res => {
          this.resData = res;
          if (this.resData.content[0] == null) {
            this.createUser();
          } else {
            this.failure();
          }
        }));
      }
    }
  }

  /**
   * Creates a new User
   */
  createUser() {
      this.api.createUser(this.userModifyModel)
        .catch((error: any) => {
          throw new Error('Unknown error');
        })
        .then( res => {
          this.resData = res;
          if (this.resData != null) {
            if (this.resData.httpStatus === 'CREATED') {
              this.modal.open('Success!', 'User : ' + this.userModifyModel.username, 'Has been created successfully.');
              // Navigate back to user-management-page
              this.router.navigateByUrl('/users');
            } else {
              // Determine, response code, body message and handle.
              this.errordDataS.sendErrorModel(this.resData);
              this.router.navigateByUrl('/generror');
            }
          }
      });
  }

  /**
   * Modifies an existing user
   */
  modifyUser() {
      this.api.modifyUser(this.userModifyModel)
        .catch((error: any) => {
          throw new Error('Unknown error');
        })
        .then( res => {
          this.resData = res;
          if (this.resData != null) {
            if (this.resData.httpStatus === 'OK') {
              this.modal.open('Success!', 'User : ' + this.userModifyModel.username, 'Has been modified succesfully.');
              this.router.navigateByUrl('/users');
            } else {
              this.errordDataS.sendErrorModel(this.resData);
              this.router.navigateByUrl('/generror');
            }
          }
      });
  }

  /**
   * Returns selected user data.
   */
  getUserData() {
    this.data.usernameData.subscribe(val => {
      this.user = val;
    });
    if (this.user != null) {
      this.userModifyModel.username = this.user;
      this.returnedUsername = this.user.username;
    }
    this.data.userIdData.subscribe(val => {
      this.userId = val;
    });
  }

  /**
   * Resets the Data used by the component
   */
  resetData() {
    this.data.sendNameData(null);
    this.data.sendIdData(null);
  }

  /**
   * Validates the entered data meets requirements
   */
  validate() {
    if (!PassPlexityValidation.isValid() || this.userModifyModel.password !== this.userModifyModel.pwVerify) {
      return false;
    } else if (PassPlexityValidation.isValid() ) {
      return true;
    }
  }

  /**
   * Method executed when onFailure
   */
  failure() {
    this.modal.open('Failure!', 'User : ' + this.userModifyModel.username, ' already exists, please try another username.');
  }
}
