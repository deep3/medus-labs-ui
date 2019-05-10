import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: 'modal-undeploylab.html'
})

export class ModalUndeployLabComponent implements OnInit {
    @Input() title;
    @Input() body;

    private modalRef: any;

    constructor(public activeModal: NgbActiveModal,
                private modalService: NgbModal,
                ) {}

    ngOnInit(): void {

    }

    /**
     * Open a new modal dialog
     * @param titleContent The title of the modal
     * @param bodyContent The body of the modal
     */
    open(titleContent, bodyContent) {
      this.modalRef = this.modalService.open(ModalUndeployLabComponent, {size: 'lg', backdrop: 'static', keyboard: false});
      this.modalRef.componentInstance.title = titleContent;
      this.modalRef.componentInstance.body = bodyContent;
    }

    /**
     * Gets the reference of the modal
     */
    getModalRef() {
        return this.modalRef;
    }

    /**
     * method to return boolean before modal closed
     */
    beforeClose(): boolean {
        return true;
    }

    /**
     * method to return boolean before modal dismissed
     */
    beforeDismiss(): boolean {
        return false;
    }



}
