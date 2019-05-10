import { Component, OnInit } from '@angular/core';

import { OrganisationsApiService } from '../../api/organisations/organisations-api.service';
import { LabsApiService } from '../../api/labs/labs-api.service';
import { AwsApiService } from '../../api/aws/aws-api.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {


  assignedRole = null;
  accountId = null;
  instanceId = null;
  inUseAccounts = null;
  availableAccounts = null;
  totalAccounts = null;

  constructor(private orgsApi: OrganisationsApiService,
              private labsApi: LabsApiService,
              private awsApi: AwsApiService) { }

  ngOnInit(): void {
    Promise.resolve(this.labsApi.getNoOfAvailableAccounts()).then( (available: number) => {
        this.availableAccounts = available;
        Promise.resolve(this.orgsApi.getMemberOrganisationAccounts('valid').then((validAccounts: Array<any>) => {
          this.totalAccounts = validAccounts.length;
          this.inUseAccounts = this.totalAccounts - this.availableAccounts;
          }));
    });

    Promise.resolve(this.orgsApi.getRootAccountId().then((result) => {
      if (result['content'] != null && result['content'][0] != null && result['content'][0] !== '') {
        this.accountId = result['content'][0];
      }    }));
    Promise.resolve(this.awsApi.getInstanceId().then((result) => {
      if (result['content'] != null && result['content'][0] != null && result['content'][0] !== '') {
        this.instanceId = result['content'][0];
      }
    }));
    Promise.resolve(this.awsApi.getRoleArn().then((result) => {
      const arn = result['content'][0];
      if (arn) {
        const arnArr = arn.split('/');
        if (arnArr != null && arnArr.length > 0) {
          this.assignedRole = arnArr[1];
        }
      }
    }));
  }
}
