import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationModel } from '../../data-models/configuration-model';
import { ConfigDataService  } from '../../data-service/configuration-data.service';
import { Router } from '@angular/router';
import { DeploymentResponseDataService } from '../../data-service/deployment-response-data.service';
import { LabsApiService } from '../../api/labs/labs-api.service';
import { AwsApiService } from '../../api/aws/aws-api.service';
import { AwsRegionConverter } from '../../aws-region-converter.pipe';

@Component({
    templateUrl: 'modal-configuration.html'
})

export class ModalConfigurationComponent implements OnInit {

    @Input() title;
    @Input() user;
    @Input() body;

    private accountResData: any;
    private modalRef: any;
    private paramResData: any;
    private outputArray: any;
    private objModel = {};

    selectedValue = 1;
    item: any;
    availableUsers: number;
    error: boolean;
    isDirty: boolean;
    loading = true;
    inputArr: any;
    selectedRegion: string;

    constructor(public activeModal: NgbActiveModal,
                private modalService: NgbModal,
                private awsApi: AwsApiService,
                private labsApi: LabsApiService,
                private configDS: ConfigDataService,
                private router: Router,
                private deploymentDataService: DeploymentResponseDataService,
                private regionConverter: AwsRegionConverter) {
                }

    /**
     * Opens a new modal dialog
     * @param titleContent The Title of the Modal
     * @param userContent The User Content
     * @param bodyContent  The Body Content
     */
    open(titleContent, userContent, bodyContent) {
        this.modalRef = this.modalService.open(ModalConfigurationComponent);
        this.modalRef.componentInstance.title = titleContent;
        this.modalRef.componentInstance.body = bodyContent;
        this.modalRef.componentInstance.user = userContent;
    }

    /**
     * Method executed when selection is changed
     * @param value new value
     */
    onSelectedChange(value: number) {
        this.selectedValue = value;
    }

    ngOnInit(): void {
        this.getAccounts();
        this.getParameters();
    }

    /**
     * Get a list of accounts
     */
    getAccounts() {
       this.loading = true;
        this.configDS.configDataName.subscribe(val => {
            this.item = val;
            this.selectedRegion = this.regionConverter.transform(val.regions[0]);
          });
          Promise.resolve(this.labsApi.getNoOfAvailableAccounts())
          .then( res => {
            this.loading = false;
            this.accountResData = res;
            this.availableUsers = this.accountResData;
         });
    }

    /**
     * Get Parameters for this Modal
     */
    getParameters() {
        Promise.resolve(this.awsApi.getKnownParameters(this.item.name))
        .then( res => {
          this.paramResData = res;

          this.inputArr = Object.entries(this.paramResData).map(([type, value]) => ({type, value}));

         this.outputArray = new Array;

          for (let i = 0; i < this.inputArr.length; i++) {
            this.inputArr[i].value.ParameterName = this.inputArr[i].Name;
            this.outputArray[i] = this.inputArr[i].value;
           }
       });
    }

    /**
     * Method executed when form is submitted
     */
    onSubmit() {

        this.getEnteredParameters();

        if (this.selectedValue !== 0 && this.selectedValue <= this.availableUsers) {

            this.error = false;

            const configModel: ConfigurationModel = {
                amount: this.selectedValue,
                name: this.item.name,
                region: this.regionConverter.transform(this.selectedRegion),
                params: this.objModel
            };
            this.deployLab(configModel);

        } else {
            this.error = true;
        }
    }

    /**
     * Method to deploy a lab using provided configurations
     * @param configModel A Configuration Model with valid Parameters
     */
    deployLab(configModel) {
        Promise.resolve(this.awsApi.deployLab(configModel)).then(
            response => {
                this.deploymentDataService.createdUserEntryMethod(response['content'][0]);
                this.deploymentDataService.registerDeployingStack(response['content'][0].deployedLab.id);
                this.activeModal.close();
                this.router.navigate(['/deployment/' + response['content'][0].deployedLab.id]);
            }
        );
    }

    /**
     * Method to get Parameters entered by a user
     */
    getEnteredParameters() {
        for (let i = 0; i < this.inputArr.length; i++) {

            if ((<HTMLTextAreaElement>document.getElementById(this.inputArr[i].value.Name)).value === '') {
            this.objModel[this.inputArr[i].value.Name] = this.inputArr[i].value.Value;

        } else {
            this.objModel[this.inputArr[i].value.Name] = this.inputArr[i].value.Name;
        }}

    }

    /**
     * Method called when form modified
     */
    onModified() {
        this.isDirty = true;
    }
}

