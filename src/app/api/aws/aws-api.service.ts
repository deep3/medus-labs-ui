import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ResponseWrapper } from '../../../response-wrapper.model';
import { MasterApiService } from '../master-api.service';



 @Injectable()
 export class AwsApiService extends MasterApiService {

    private baseUrl = this.getUrl();
    private baseHttp = this.getHttp();

    /**
     * Gets the AWS instance ID
     */
    public getInstanceId() {
        return this.baseHttp.get<ResponseWrapper<String>>(this.baseUrl + 'metadata/instanceid')
        .map(res => res)
        .toPromise();
    }

    /**
     * Get The Instance Role ARN
     */
    public getRoleArn() {
        return this.baseHttp.get<ResponseWrapper<String>>(this.baseUrl + 'metadata/instancerole')
        .map(res => res)
        .toPromise();
    }

    /**
     * Get a list of available Labs to deploy
     */
     public getAvailableLabs() {

        const promise = new Promise(resolve =>
             this.baseHttp.get<any>(this.baseUrl + 'aws/labs/')
             .toPromise()
             .then((response => {
                 if (response['httpStatus'] === 'OK') {
                     resolve(response['content']);
                 }
               })
             )
         );
         return promise;
     }

     /**
      * Deploy a lab into the linked AWS environment
      * @param configModel - The ConfiguationModel containing parameters
      */
     public deployLab(configModel) {
        return this.baseHttp.post<any>(this.baseUrl + 'aws/labs/deploy/', configModel)
        .map(res => res)
        .toPromise();

     }

     /**
      * Undeploy a lab from the linked AWS Environment
      * @param deployedLabId - The DeployedLabID to 'undeploy'
      */
     public undeployLab(deployedLabId) {
        return this.baseHttp.delete<any>(this.baseUrl + 'aws/labs/undeploy/', {
            params: new HttpParams().set('deployedLabId', deployedLabId)
        })
        .map(res => res)
        .toPromise();

     }

    /**
     * Get the Known Parameters for the LabType specified by the passed value
     * @param labType The Lab Type
     */
    public getKnownParameters(labType) {
        const promise = new Promise(resolve =>
            this.baseHttp.get<any>(this.baseUrl + 'aws/labs/param', {
            params: {service : labType}
        })
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
