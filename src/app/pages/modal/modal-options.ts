import {Component, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngbd-modal-content',
  templateUrl: 'modal-options.html'

})
export class ModalOptionsComponent {
    @Input() title;
    @Input() user;
    @Input() body;
    activeModal: NgbActiveModal;

    /**
     * Opens a new Modal dialog
     * @param titleContent The title of the Modal
     * @param userContent The user content for the Modal
     * @param bodyContent The body content for the Modal
     */
    open(titleContent, userContent, bodyContent) {
      const modalRef = this.modalService.open(this);
      modalRef.componentInstance.title = titleContent;
      modalRef.componentInstance.body = bodyContent;
      modalRef.componentInstance.user = userContent;
    }

    constructor(private modalService: NgbModal, activeModal: NgbActiveModal) {}
}
