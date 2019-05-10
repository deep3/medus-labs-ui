import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableModule } from 'angular-6-datatable';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { ConfigDataService } from '../data-service/configuration-data.service';
import { ModalConfigurationComponent } from '../pages/modal/modal-configuration';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DeploymentResponseDataService } from '../data-service/deployment-response-data.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DeploymentComponent } from '../pages/deployment/deployment.component';
import { ModalCreatedUserComponent } from '../pages/modal/modal-createdstudent';
import { AwsApiService } from '../api/aws/aws-api.service';
import { LabsApiService } from '../api/labs/labs-api.service';
import { AwsRegionConverter } from '../aws-region-converter.pipe';

describe('ModalConfigurationComponent', () => {

  let component: ModalConfigurationComponent;
  let fixture: ComponentFixture<ModalConfigurationComponent>;
  let service1: LabsApiService;
  let service2: AwsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfigurationComponent, AwsRegionConverter],
      imports: [RouterTestingModule, DataTableModule, FormsModule],
      providers: [NgbActiveModal, NgbModal, NgbModalStack, LabsApiService, AwsApiService, HttpClient, HttpHandler, NgbModalModule,
        ScrollBar, ConfigDataService, ModalConfigurationComponent, DeploymentResponseDataService, DeploymentComponent,
        ModalCreatedUserComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().catch(error => console.error(error));

    // create test fixture
    fixture = TestBed.createComponent(ModalConfigurationComponent);
    // get component from fixture
    component = fixture.componentInstance;

    service1 = TestBed.get(LabsApiService);
    service2 = TestBed.get(AwsApiService);
  });

  afterEach(() => { });

  it(`should create`, async(() => {
    spyOn(component, 'getAccounts').and.returnValue(2);
    spyOn(component, 'getParameters').and.returnValue(null);
    expect(component).toBeDefined();
  }));

  it('should set value when number of users is changed', () => {
    spyOn(component, 'onSelectedChange').and.callThrough();
    component.onSelectedChange(3);
    expect(component.onSelectedChange).toHaveBeenCalledTimes(1);
    expect(component['selectedValue']).toEqual(3);
  });

  it('should set isDirty to true when onModified() called', () => {
    spyOn(component, 'onModified').and.callThrough();
    component.onModified();
    expect(component.onModified).toHaveBeenCalledTimes(1);
    expect(component['isDirty']).toBeTruthy();
  });

  it('should call getAccounts, getParameters and connect to Socket during init', () => {
    spyOn(component, 'getAccounts').and.returnValue(null);
    spyOn(component, 'getParameters').and.returnValue(null);
    component.ngOnInit();
    expect(component.getParameters).toHaveBeenCalledTimes(1);
    expect(component.getAccounts).toHaveBeenCalledTimes(1);
  });

  it('should set Error to true if number of accounts selected exceeds available', () => {
    spyOn(component, 'getEnteredParameters').and.returnValue(null);
    component['error'] = false;
    component['availableUsers'] = 1;
    component['selectedValue'] = 10;
    component.onSubmit();
    expect(component['error']).toBe(true);
  });

  it('should validate the number of accounts selected during onSubmit and set error to true if invalid', () => {
    spyOn(component, 'getEnteredParameters').and.returnValue(null);
    component['error'] = false;
    component['availableUsers'] = 1;
    component['selectedValue'] = 10;
    component.onSubmit();
    expect(component['error']).toBe(true);
  });

  it('should validate the number of accounts selected during onSubmit and only complete if valid', () => {
    spyOn(component, 'getEnteredParameters').and.returnValue(null);
    spyOn(component, 'deployLab').and.callFake(() => { });
    spyOn(component['activeModal'], 'close').and.callFake(() => { });
    spyOn(component['router'], 'navigateByUrl').and.callFake(() => { });
    component['item'] = JSON.parse('[{"name":"testName"}]');
    component['objModel'] = null;
    component['error'] = true;
    component['availableUsers'] = 10;
    component['selectedValue'] = 5;
    component.onSubmit();
    expect(component['error']).toBe(false);
  });
});
