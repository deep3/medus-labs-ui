import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ModalConfigurationComponent } from '../pages/modal/modal-configuration';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { ConfigDataService } from '../data-service/configuration-data.service';
import { DeploymentResponseDataService } from '../data-service/deployment-response-data.service';
import { AwsApiService } from '../api/aws/aws-api.service';
import { LabsApiService } from '../api/labs/labs-api.service';
import { OrganisationsApiService } from '../api/organisations/organisations-api.service';

describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let service: AwsApiService;
  let service2: OrganisationsApiService;
  let service3: LabsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [RouterTestingModule, DataTableModule],
      providers: [OrganisationsApiService, LabsApiService, AwsApiService, HttpClient, HttpHandler,
        NgbActiveModal, NgbModal, NgbModalStack, ConfigDataService, ModalConfigurationComponent, DeploymentResponseDataService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().catch(error => console.error(error));

    // create test fixture
    fixture = TestBed.createComponent(DashboardComponent);

    // get component from fixture
    component = fixture.componentInstance;
    service = TestBed.get(AwsApiService);
    service2 = TestBed.get(OrganisationsApiService);
    service3 = TestBed.get(LabsApiService);
  });

  afterEach(() => {
    component = null;
    fixture = null;
  });

  it(`should create`, async(() => {
    spyOn(component, 'ngOnInit').and.returnValue(null);
    expect(component).toBeDefined();
  }));

  it('should run ngOnInit() and set accountID, instanceId and assignedRole', async(() => {
    const accountIdResponse = JSON.parse('{"content" : ["testaccountID"]}');
    const instanceIdResponse = JSON.parse('{"content" : ["testinstanceID"]}');
    const arnResponse = JSON.parse('{"content" : ["testArn"]}');
    const availableAccountsResponse = JSON.parse('{"content" : ["30"]}');
    const organisationAccountsResponse = JSON.parse('{"content" : [{"account":"1"}]}');

    spyOn(service2, 'getRootAccountId').and.callFake(() => Promise.resolve(accountIdResponse));
    spyOn(service, 'getInstanceId').and.callFake(() => Promise.resolve(instanceIdResponse));
    spyOn(service, 'getRoleArn').and.callFake(() => Promise.resolve(arnResponse));
    spyOn(service3, 'getNoOfAvailableAccounts').and.callFake(() => Promise.resolve(availableAccountsResponse));
    spyOn(service2, 'getMemberOrganisationAccounts').and.callFake(() => Promise.resolve(organisationAccountsResponse));

    component.ngOnInit();

    fixture.whenStable().then(() => {
      expect(service2.getRootAccountId).toHaveBeenCalled();
      expect(service.getInstanceId).toHaveBeenCalled();
      expect(service.getRoleArn).toHaveBeenCalled();
    });
  }));

  it('should run ngOnInit() and be able to handle null replies when setting accountID, instanceId and assignedRole', async(() => {
    const accountIdResponse = JSON.parse('{"content" : ""}');
    const instanceIdResponse = JSON.parse('{"content" : ""}');
    const arnResponse = JSON.parse('{"content" : ""}');
    const availableAccountsResponse = JSON.parse('{"content" : ""}');
    const organisationAccountsResponse = JSON.parse('{"content" : ""}');

    spyOn(service2, 'getRootAccountId').and.callFake(() => Promise.resolve(accountIdResponse));
    spyOn(service, 'getInstanceId').and.callFake(() => Promise.resolve(instanceIdResponse));
    spyOn(service, 'getRoleArn').and.callFake(() => Promise.resolve(arnResponse));
    spyOn(service3, 'getNoOfAvailableAccounts').and.callFake(() => Promise.resolve(availableAccountsResponse));
    spyOn(service2, 'getMemberOrganisationAccounts').and.callFake(() => Promise.resolve(organisationAccountsResponse));
    component.ngOnInit();

    fixture.whenStable().then(() => {
      expect(service2.getRootAccountId).toHaveBeenCalled();
      expect(service.getInstanceId).toHaveBeenCalled();
      expect(service.getRoleArn).toHaveBeenCalled();
    });
  }));
});
