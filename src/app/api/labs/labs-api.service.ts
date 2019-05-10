import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ResponseWrapper } from '../../../response-wrapper.model';
import { LabBuilderServices } from '../../data-models/lab-builder-services.model';
import { DeployedLabActivity } from '../../data-models/active-lab-activity.model';
import { MasterApiService } from '../master-api.service';


@Injectable()
export class LabsApiService extends MasterApiService {

    private baseUrl = this.getUrl();
    private baseHttp = this.getHttp();

    /**
     * Get the activity for all Labs
     */
    public getLabActivity(): Observable<ResponseWrapper<DeployedLabActivity>> {
        return this.baseHttp.get<ResponseWrapper<DeployedLabActivity>>(this.baseUrl + 'labs/');
    }

    /**
     * Get the avaialble Lab Builder services
     */
    public getLabBuilderServices(): Observable<ResponseWrapper<LabBuilderServices>> {
        return this.baseHttp.get<ResponseWrapper<LabBuilderServices>>(this.baseUrl + 'labs/');
    }

    /**
     * Get a list of Labs that have been deployed
     */
    public getDeployedLabs() {
        const promise = new Promise(resolve =>
            this.baseHttp.get<any>(this.baseUrl + 'labs/deployed/')
            .toPromise()
            .then((response => {
                if (response['httpStatus'] === 'OK') {
                    resolve(response['content']);
                }
            })));
        return promise;
    }

    /**
     * Get a list of labs that have been deleted (undeployed)
     */
    public getDeletedLabs() {
        const promise = new Promise(resolve =>
            this.baseHttp.get<any>(this.baseUrl + 'labs/deleted/')
            .toPromise()
            .then((response => {
                if (response['httpStatus'] === 'OK') {
                    resolve(response['content']);
                }
            })
        ));
        return promise;
    }

    /**
     * Get Logs related to a deployed Lab
     * @param labId The Deployed Lab ID
     */
    public getDeployedLabLogs(labId) {
        const promise = new Promise(resolve =>
            this.baseHttp.get<any>(this.baseUrl + 'labs/deployed/logs/' + labId)
            .toPromise()
            .then((response => {
                if (response['httpStatus'] === 'OK') {
                    resolve(response['content']);
                }
            })
        ));
        return promise;
    }

    /**
     * Get an Integer value representing the umber of available clean accounts in the linked AWS environment
     */
    public getNoOfAvailableAccounts() {
    const promise = new Promise(resolve =>
        this.baseHttp.get<any>(this.baseUrl + 'labs/accounts/clean')
        .toPromise()
        .then((response => {
            if (response['httpStatus'] === 'OK') {
                resolve(response['content']);
            }
          })
        ));
        return promise;
    }
}
