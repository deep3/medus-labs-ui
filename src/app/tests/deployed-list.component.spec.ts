import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DeployedListComponent } from '../pages/labs/deployed-list.component';
import { ModalUndeployLabComponent } from '../pages/modal/modal-undeploylab';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { LabsApiService } from '../api/labs/labs-api.service';
import { AwsApiService } from '../api/aws/aws-api.service';
import { DeploymentResponseDataService } from '../data-service/deployment-response-data.service';
import { ModalCreatedUserComponent } from '../pages/modal/modal-createdstudent';


describe('DeployedListComponent', () => {

  let component: DeployedListComponent;
  let fixture: ComponentFixture<DeployedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeployedListComponent, ModalUndeployLabComponent],
      imports: [RouterTestingModule, DataTableModule, NgbModalModule],
      providers: [AwsApiService, LabsApiService, HttpClient, HttpHandler,
        ModalUndeployLabComponent, NgbActiveModal, NgbModal, NgbModalStack, ScrollBar, DeploymentResponseDataService,
        ModalCreatedUserComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().catch(error => console.error(error));

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ModalUndeployLabComponent]
      }
    });

    // create test fixture
    fixture = TestBed.createComponent(DeployedListComponent);

    // get component from fixture
    component = fixture.componentInstance;
  });

  afterEach(() => {
    component = null;
    fixture = null;
  });

  it(`should create`, async(() => {
    spyOn(component, 'getDeployedLabs').and.returnValue(null);
    expect(component).toBeDefined();
  }));

  it('should call getDeployedLabs once during ngOnInit()', async(() => {
    spyOn(component, 'getDeployedLabs').and.returnValue(null);
    component.ngOnInit();
    expect(component.getDeployedLabs).toHaveBeenCalledTimes(1);
  }));

  it('should return boolean value when calling isLoading()', () => {
    spyOn(component, 'isLoading').and.callThrough();
    component['deployedLabsLoading'] = true;
    const res = component.isLoading();
    expect(res).toBe(true);
    component.deployedLabsLoading = false;
    const res2 = component.isLoading();
    expect(res2).toBe(false);
  });

  it('should return true value when calling isDeployedLabsZero if the are no labs', () => {
    spyOn(component, 'isDeployedLabsZero').and.callThrough();
    component['DEPLOYED_LABS'] = [];
    const res = component.isDeployedLabsZero();
    expect(res).toBe(true);
  });

  it('should return true value when calling isLabDeletable if status is ACTIVE or fAILED', () => {
    spyOn(component, 'isLabDeletable').and.callThrough();
    const res = component.isLabDeletable('ACTIVE');
    const res2 = component.isLabDeletable('FAILED');
    const res3 = component.isLabDeletable('DEPLOYING');
    expect(res).toBe(true);
    expect(res2).toBe(true);
    expect(res3).toBe(false);
  });

  it('should navigate to new page when OnGetLogs() is called', () => {
    spyOn(component, 'onGetLogs').and.callThrough();
    spyOn(component['router'], 'navigateByUrl').and.callFake(() => { });
    component.onGetLogs(1);
    expect(component['router'].navigateByUrl).toHaveBeenCalledTimes(1);
  });

  it('should send request to API to undeploy a lab when deleteLab() is called', () => {
    spyOn(component, 'deleteLab').and.callThrough();

    const labs = JSON.parse('[{"id": 100, "description" : "a description", "labType" : "lexlab", "startDateTime" : "10-10-18"}]');
    const obj = JSON.parse('[{"id":"100", "logLevel":"WARNING", "message" : "this is a message", "date" : "12-10-2012"}]');

    spyOn(component['awsApi'], 'undeployLab').and.callFake(() => Promise.resolve(obj));
    spyOn(component['labsApi'], 'getDeployedLabs').and.callFake(() => Promise.resolve(labs));

    const testObject = { item: 'test-Item', deployedLabStatus: null };

    component.setItem(testObject);
    component.deleteLab();

    expect(component['awsApi'].undeployLab).toHaveBeenCalledTimes(1);
  });
});
