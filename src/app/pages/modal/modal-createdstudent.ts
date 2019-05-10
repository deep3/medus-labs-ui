import { Component, Input, OnInit} from '@angular/core';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DeploymentResponseDataService } from '../../data-service/deployment-response-data.service';
import { CreatedStudentModel } from '../../data-models/created-student-model.model';
import { Router } from '@angular/router';
import { LabsApiService } from '../../api/labs/labs-api.service';
@Component({
    templateUrl: 'modal-createdstudent.html'
})

export class ModalCreatedUserComponent implements OnInit {
    @Input() title;
    @Input() id;

    private modalRef: any;
    STUDENT_DATA: CreatedStudentModel[] = new Array<CreatedStudentModel>();
    LAB_DATA: any;

    constructor(public activeModal: NgbActiveModal,
                private modalService: NgbModal,
                private deploymentResponse: DeploymentResponseDataService,
                public router: Router,
                private apiservice: LabsApiService) {}

                ngOnInit(): void {
                    this.getStudentsData();
                    this.getDeployedLabData();
                }

    /**
     * Open a new Modal Dialog
     * @param titleContent The title of the modal
     * @param idContent  The Id content of the modal
     */
    open(titleContent, idContent) {
      this.modalRef = this.modalService.open(ModalCreatedUserComponent, {size: 'lg', backdrop: 'static', keyboard: false});
      this.modalRef.componentInstance.title = titleContent;
      this.modalRef.componentInstance.id = idContent;
    }

    /**
     * Populate the Student Data object with the selected student login data based upon lab id.
     */
    getStudentsData() {
        this.STUDENT_DATA = this.deploymentResponse.getUserCredentialsBasedUponId(this.id);
    }

    /**
     * Get the Deployed Lab data, including users
     */
    getDeployedLabData() {
        Promise.resolve(this.apiservice.getDeployedLabs().then((result) => {
            const resultArr = Object.keys(result).map(function(resultIndex) {
                const resultObj = result[resultIndex];
                return resultObj;
            });

            for (const index of resultArr) {
                if (index.id === this.id) {
                    this.LAB_DATA = index;
                }
            }
        }));
    }

    /**
     * Method called when 'print' clicked
     */
    onPrint() {
        window.print();
    }

    /**
     * Gets a reference to the active modal
     */
    getModalRef() {
        return this.modalRef;
    }

    /**
     * Closes the Modal
     */
    close() {
        this.activeModal.dismiss('Cross click');
        this.router.navigate(['/labs/active']);
    }
}
