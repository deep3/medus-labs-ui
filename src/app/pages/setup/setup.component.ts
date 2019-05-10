import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalCreatedMemberAccountsComponent } from '../modal/modal-createdmemberaccounts';
import { OrganisationsApiService } from '../../api/organisations/organisations-api.service';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html'
})
export class SetupComponent implements OnInit {
  createAccountsForm: FormGroup;
  sampleEmails: String;
  submitted: boolean;
  createAccountsModel: any = {};
  loading: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private api: OrganisationsApiService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.createAccountsForm = this.formBuilder.group(
      {
      accounts: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
      }
    );
  }
  // convenience getter for easy access to form fields
  get f() { return this.createAccountsForm.controls; }

  /**
   * Method executed when form submitted
   */
  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.createAccountsForm.invalid) {
        return;
    }

    this.api.createNewAccounts(this.createAccountsModel)
        .catch((error: any) => {
          this.modalService.open('Error, unexpected data received from API');
          this.loading = false;
        })
        .then( resData => {
          if (resData != null) {
            if (resData.httpStatus === 'OK') {

                    const modalRef = this.modalService.open(ModalCreatedMemberAccountsComponent, {
                      backdrop : 'static',
                      keyboard : false
                    } );
                    modalRef.componentInstance.accounts = resData.content;
            } else {
                this.modalService.open('Error, unexpected data received from API');
                this.loading = false;
            }
          }
      });
  }

  /**
   * Method to generate sample email addresses as required by service
   * @param email The email address to use as the base
   */
  generateSampleEmails(email: String) {
    const at: number = email.indexOf('@');
    return email.substr(0, at) + '+AJEAR' + email.substr(at) + ', ' + email.substr(0, at) + '+YJSRF' + email.substr(at);

  }

  /**
   * Populates a list of smaple emails
   */
  sampleEmail() {
   if (this.createAccountsForm.get('email').valid) {
    this.sampleEmails = this.generateSampleEmails(this.createAccountsForm.get('email').value);
   } else {
    this.sampleEmails = '';
   }
  }

}
