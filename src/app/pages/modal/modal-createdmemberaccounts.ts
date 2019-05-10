import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ngbd-modal-content',
    templateUrl: 'modal-createdmemberaccounts.html'
  })
  export class ModalCreatedMemberAccountsComponent {
    @Input() accounts;
    constructor(public activeModal: NgbActiveModal, public router: Router) {}

    close() {
        this.activeModal.dismiss('Cross click');
        this.router.navigate(['/accounts']);
    }
 }
