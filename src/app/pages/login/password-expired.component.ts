import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UsersApiService } from '../../api/user/users-api.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { OrganisationsApiService } from '../../api/organisations/organisations-api.service';
declare var PassPlexityValidation: any;

@Component({
  templateUrl: './password-expired.component.html'
})

export class PasswordExpiredComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted: boolean;
  loading: boolean;
  resData: any;
  userModifyModel: any = {};

  constructor(
    private api: UsersApiService,
    private organisationapi: OrganisationsApiService,
    private router: Router,
    private authenticationservice: AuthenticationService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    PassPlexityValidation.applyPassPlexity();
    this.resetPasswordForm = this.formBuilder.group({
        password: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.resetPasswordForm.controls; }

  /**
   * Method called when form is submitted
   */
  onSubmit() {

    if (this.validate()) {
        Promise.resolve(this.api.getUserExists(this.authenticationservice.getUsername())
        .then( res => {
          this.resData = res;
            const pass = this.userModifyModel.password;
            this.userModifyModel = this.resData.content[0];
            this.userModifyModel.password = pass;
            this.userModifyModel.lastLoggedIn = Date.now();
            this.modifyUser();
        })
      );
  }
}

/**
 * Method to modify a user
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
            // Navigate back to /login?
            Promise.resolve(this.organisationapi.getMemberOrganisationAccounts('valid').then((result) => {
                const existingValidAccounts = Object.keys(result).map(function(resultIndex) {
                    const resultObj = result[resultIndex];
                    return resultObj;
                });
                // If no accounts, go to setup
                if (existingValidAccounts.length === 0) {
                    this.router.navigate(['/setup']);
                } else { // else dashboard
                    this.router.navigate(['/dashboard']);
                }
            }));
          } else {
            // Determine, response code, body message and handle.
            this.router.navigateByUrl('/passwordexpired');
          }
        }
    });
}

/**
 * Method to ensure the password complexity has been met
 */
validate() {
    if (!PassPlexityValidation.isValid() || this.userModifyModel.password !== this.userModifyModel.pwVerify) {
      return false;
    } else if (PassPlexityValidation.isValid() ) {
      return true;
    }
  }
}
