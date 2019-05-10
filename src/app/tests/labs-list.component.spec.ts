import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LabsListComponent } from '../pages/labs/labs-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ModalConfigurationComponent } from '../pages/modal/modal-configuration';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { ConfigDataService } from '../data-service/configuration-data.service';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { DeploymentComponent } from '../pages/deployment/deployment.component';
import { DeploymentResponseDataService } from '../data-service/deployment-response-data.service';
import { ModalCreatedUserComponent } from '../pages/modal/modal-createdstudent';
import { AwsApiService } from '../api/aws/aws-api.service';
import { LabsApiService } from '../api/labs/labs-api.service';

describe('LabsListComponent', () => {

  let component: LabsListComponent;
  let fixture: ComponentFixture<LabsListComponent>;
  let service: AwsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabsListComponent],
      imports: [RouterTestingModule, DataTableModule],
      providers: [LabsApiService, AwsApiService, HttpClient, HttpHandler,
        NgbActiveModal, NgbModal, NgbModalStack,
        ScrollBar, ConfigDataService, ModalConfigurationComponent, ModalCreatedUserComponent,
        DeploymentComponent, DeploymentResponseDataService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().catch(error => console.error(error));

    // create test fixture
    fixture = TestBed.createComponent(LabsListComponent);
    // get component
    component = fixture.componentInstance;
    service = TestBed.get(AwsApiService);
  });

  afterEach(() => {
    component = null;
    fixture = null;
  });

  it(`should create`, async(() => {
    spyOn(component, 'getAvailableLabs').and.returnValue(null);
    expect(component).toBeDefined();
  }));

  it('should call getAvailableLabs once during ngOnInit()', async(() => {
    spyOn(component, 'getAvailableLabs').and.returnValue(null);
    component.ngOnInit();
    expect(component.getAvailableLabs).toHaveBeenCalledTimes(1);
  }));

  it('should return boolean value when calling isLoading()', () => {
    spyOn(component, 'isLoading').and.callThrough();
    component['availableLabsLoading'] = true;
    const res = component.isLoading();
    expect(res).toBe(true);
    component.availableLabsLoading = false;
    const res2 = component.isLoading();
    expect(res2).toBe(false);
  });

  it('should send the configuration data to the Data Service during onDeploy()', () => {
    spyOn(component['configDS'], 'sendConfigModel').and.callFake(() => { });
    spyOn(component['modal'], 'open').and.callFake(() => { });
    component.onDeploy(null);

    expect(component['configDS'].sendConfigModel).toHaveBeenCalledTimes(1);
    expect(component['modal'].open).toHaveBeenCalledTimes(1);
  });

  it('should send modal and open dialog during onDeploy', () => {
    spyOn(component['configDS'], 'sendConfigModel').and.callFake(() => { });
    spyOn(component['modal'], 'open').and.callFake(() => { });
    component.onDeploy(null);

    expect(component['configDS'].sendConfigModel).toHaveBeenCalledTimes(1);
    expect(component['modal'].open).toHaveBeenCalledTimes(1);
  });

  it('should populate with avaialbleLabs during getAvailableLabs()', (async () => {
    const obj = JSON.parse('[{"name":"LABS/testLab", "status":"ACTIVE", "id" : "1"}]');
    spyOn(service, 'getAvailableLabs').and.callFake(() => Promise.resolve(obj));

    component.getAvailableLabs();

    fixture.whenStable().then(() => {
      expect(component['AVAILABLE_LABS'].length).toBe(1);
    });
  }));
});
