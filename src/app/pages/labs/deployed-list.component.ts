import { Component, OnInit } from '@angular/core';
import { DeployedLabActivity } from '../../data-models/active-lab-activity.model';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { LabsApiService } from '../../api/labs/labs-api.service';
import { AwsApiService } from '../../api/aws/aws-api.service';
import { ModalUndeployLabComponent } from './../modal/modal-undeploylab';
import { DeploymentResponseDataService } from '../../data-service/deployment-response-data.service';
import { ModalCreatedUserComponent } from '../modal/modal-createdstudent';

@Component({
  selector: 'app-deployed-list',
  templateUrl: 'deployed-list.component.html'
})
export class DeployedListComponent implements OnInit {
  public deployedLabsLoading = true;
  private DEPLOYED_LABS: DeployedLabActivity[] = [];
  private item: any;
  public result: string;
  private modalInstance: any;

  constructor(private labsApi: LabsApiService,
              private awsApi: AwsApiService,
              private router: Router,
              private undeployLab: ModalUndeployLabComponent,
              private dataResponse: DeploymentResponseDataService,
              private createdUserModel: ModalCreatedUserComponent
              ) { }

  ngOnInit() {
    this.getDeployedLabs();
  }

  /**
   * Get a list of Deployed Labs
   */
  getDeployedLabs() {
    this.deployedLabsLoading = true;

    if (this.DEPLOYED_LABS == null) {
      this.DEPLOYED_LABS = [];
    }

    Promise.resolve(this.labsApi.getDeployedLabs().then((result) => {
      const resultArr = Object.keys(result).map(function (resultIndex) {
        const resultObj = result[resultIndex];
        return resultObj;
      });
      for (const index of resultArr) {

        const existingLab = this.DEPLOYED_LABS.filter(e => e.id === index.id);

            if (existingLab === null || existingLab.length === 0) {
              this.DEPLOYED_LABS.push(index);
            } else {
              const ind = this.DEPLOYED_LABS.indexOf(existingLab[0]);
              this.DEPLOYED_LABS[ind] = index;
            }
      }

      if (resultArr.length !== this.DEPLOYED_LABS.length) {
          this.DEPLOYED_LABS = resultArr;
      }

      timer(10000).subscribe(() => this.getDeployedLabs());

    })).then((result) => {
      this.deployedLabsLoading = false;
    });
  }

  /**
   * Return boolean value based upon if student stack has a key value corresponding with lab id parameter
   * @param id lab id
   */
  isCredentialsStoredAndAvailable(id) {
    return this.dataResponse.isCredentialsAvailable(id);
  }

  /**
   * Opens a modal populated with student login details based upon given parameter.
   * @param item lab data
   */
  openModalandGetLoginDetails(item) {
    this.createdUserModel.open('Created Students', item.id);
  }

  /**
  * Returns whether the data is still being fetched from the API
  */
  isLoading() {
    return this.deployedLabsLoading;
  }

  /**
  * Returns a boolean indicating whether there are any deployed Labs in the linked AWS Environment
  */
  isDeployedLabsZero() {
    return this.DEPLOYED_LABS.length === 0;
  }

  /**
   * Returns a boolean indicating whether the deployed Lab is in a state that allows it to be deleted
   * @param status The Lab status
   */
  isLabDeletable(status) {
    if (status === 'ACTIVE' || status === 'FAILED') {
      return true;
    }
    return false;
  }

  /**
   * Method executed when the remove button is clicked
   * @param item - The Lab to remove
   */
  onRemove(item) {
    this.setItem(item);

    this.undeployLab.open('Deleting Lab', 'Are you sure you wish to undeploy this lab and reset the associated student accounts?');
    this.modalInstance = this.undeployLab.getModalRef();

    this.modalInstance.result.then((resultPromise) => {
            if (resultPromise === 'true') {
              this.deleteLab();
           }
    });
  }

  /**
   * Method executed when the GetLogs button is clicked
   * @param item The Lab to show logs for
   */
  onGetLogs(item) {
    this.router.navigate(['/labs/logs/' + item.id]);
  }

  /**
   * Method to delete a lab
   */
  deleteLab() {
      // Set variable so UI can inform User
      this.item.deployedLabStatus = 'DELETING';
      // Call Endpoint to undeploy this lab, and reload the list
      this.awsApi.undeployLab(this.item.id)
        .then((result) => {
          this.getDeployedLabs();
        });
    }

  /**
  * Method to set the Lab in this component
  * @param item The Lab Object
  */
  setItem(item) {
    this.item = item;
  }
}
