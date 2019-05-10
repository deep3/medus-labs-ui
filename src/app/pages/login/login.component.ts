import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';
import { OrganisationsApiService } from '../../api/organisations/organisations-api.service';
import { UsersApiService } from '../../api/user/users-api.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  user: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private api: OrganisationsApiService,
      private usersapi: UsersApiService) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

    /**
    * Method called when form is submitted
    */
  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                Promise.resolve(this.usersapi.getUserExists(this.authenticationService.getUsername())).then((res) => {
                    this.user = res;
                    if (this.user.content[0].lastLoggedIn === null) {
                        this.router.navigate(['/passwordexpired']);
                    } else {
                        Promise.resolve(this.api.getMemberOrganisationAccounts('valid').then((result) => {
                            const existingValidAccounts = Object.keys(result).map(function(resultIndex) {
                                const resultObj = result[resultIndex];
                                return resultObj;
                            });
                            if (existingValidAccounts.length === 0) {
                                this.router.navigate(['/setup']);
                            } else {
                                this.router.navigate([this.returnUrl]);
                            }
                        }));
                     }
                });
              },
              error => {
                  this.error = 'Error, please check your username and password are correct';
                  this.loading = false;
              });
}
 }
