import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InactiveLab } from '../../data-models/inactive-lab.model';
import { ModalConfigurationComponent } from '../modal/modal-configuration';
import { ConfigDataService } from '../../data-service/configuration-data.service';
import { AwsApiService } from '../../api/aws/aws-api.service';

@Component({
    selector: 'app-labs-list',
    templateUrl: 'labs-list.component.html'
})
export class LabsListComponent implements OnInit {

    private latestDate: string;
    private currentDate_Time: any;
    public availableLabsLoading = true;

    AVAILABLE_LABS: InactiveLab[] = [];


    constructor(private router: Router,
        private awsApi: AwsApiService,
        private modal: ModalConfigurationComponent,
        private configDS: ConfigDataService) { }

    ngOnInit(): void {
        this.getAvailableLabs();
    }

    /**
     * Gets a list of available Labs from the API
     */
    getAvailableLabs() {
        this.availableLabsLoading = true;
        Promise.resolve(this.awsApi.getAvailableLabs().then((result) => {
            const resultArr = Object.keys(result).map(function (resultIndex) {
                const resultObj = result[resultIndex];
                return resultObj;
            });

            for (const index of resultArr) {
                index.name = index.name.replace('LABS/', '');
                this.AVAILABLE_LABS.push(index);
            }
        })).then((result) => {
            this.availableLabsLoading = false;
        });
    }

    /**
     * Method called when deploying a lab
     * @param item - The Lab to deploy
     */
    onDeploy(item) {

        this.configDS.sendConfigModel(item);
        this.modal.open('Success!', 'User : ' + 'user', 'Has been created successfully.');
        this.currentDate_Time = Date.now();

    }

    /**
    * Returns whether the data is still being fetched from the API
    */
    isLoading() {
        return this.availableLabsLoading;
    }
}
