import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { OrganisationsApiService } from 'src/app/api/organisations/organisations-api.service';


@Component({
  selector: 'app-modal-wipedall',
  templateUrl: './modal-wiped-all.component.html',
  providers: [NgbActiveModal,
  OrganisationsApiService,
]
})

export class ModalWipedAllComponent implements OnInit {

  public numberofdeleted: String = 'Processing... ';
  modalService: any;
  loading: Boolean = true;

  ngOnInit(): void {
   this.wipeAllData();
  }

  /**
   * Method to begin process of wiping all data from accounts in linked AWS Environment
   */
  wipeAllData() {

    this.api.wipeAll()

    .then( resData => {
      this.loading = false;
      this.numberofdeleted = resData.content[0];

        if (resData.httpStatus !== 'OK') {
          this.service.open('Delete request unsuccessful.');
        }

    })
    .catch((error: any) => {
      console.log(error);
      this.service.open('Error processing delete request.');
      this.loading = false;
    });

  }

  /**
   * Method returning a boolean value indocating whether the component is still loading
   */
  isLoading() {
    return this.loading;
  }

  /**
   * returns the number of cleaned accounts
   */

  requestStatus() {
    return this.numberofdeleted;
  }

  /**
   * method to dismiss the modal when user clicks to close
   */
  dismissModal() {
    console.log('dismissing modal');
    this.activeModal.dismiss();
  }

  constructor(
    public activeModal: NgbActiveModal,
    private api: OrganisationsApiService,
    public router: Router,
    private service: NgbModal,
     ) {}
}
