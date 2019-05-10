import { Component, OnInit } from '@angular/core';
 import {HttpClientModule} from '@angular/common/http';
import { OrganisationsApiService } from 'src/app/api/organisations/organisations-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalWipedAllComponent } from '../modal/modal-wiped-all/modal-wiped-all.component';

@Component({
  selector: 'app-cleanup',
  templateUrl: './cleanup.component.html',
  styleUrls: ['./cleanup.component.css'],
  providers: [OrganisationsApiService,
    NgbModal,
    HttpClientModule,
  ]
})


export class CleanupComponent implements OnInit {

  submitted: boolean;
  loading: boolean;
  deleted: number;

  constructor(
    private api: OrganisationsApiService,
    private modalService: NgbModal) {
   }

  ngOnInit() {
  }

  isLoading() {
    return this.loading;
  }

  onClick() {

    this.submitted = true;
    this.loading = true;
    const modalRef = this.modalService.open(ModalWipedAllComponent, {
      backdrop : 'static',
      keyboard : false,
    });

    modalRef.componentInstance.dismissed.subscribe(($e) => modalRef.close());
  }
}
