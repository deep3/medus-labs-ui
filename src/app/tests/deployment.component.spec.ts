import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DeploymentComponent } from '../pages/deployment/deployment.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ModalConfigurationComponent } from '../pages/modal/modal-configuration';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { ConfigDataService } from '../data-service/configuration-data.service';
import { DeploymentResponseDataService } from '../data-service/deployment-response-data.service';
import { ModalCreatedUserComponent } from '../pages/modal/modal-createdstudent';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { LabsApiService } from '../api/labs/labs-api.service';

describe('DeploymentComponent', () => {

  let component: DeploymentComponent;
  let fixture: ComponentFixture<DeploymentComponent>;
  let service: DeploymentResponseDataService;
  let modal: ModalCreatedUserComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeploymentComponent],
      imports: [RouterTestingModule, DataTableModule],
      providers: [HttpClient, HttpHandler,
        NgbActiveModal, NgbModal, NgbModalStack, ConfigDataService,
        ModalConfigurationComponent, DeploymentResponseDataService,
        ModalCreatedUserComponent, ScrollBar, LabsApiService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().catch(error => console.error(error));

    // create test fixture
    fixture = TestBed.createComponent(DeploymentComponent);

    // get component from fixture
    component = fixture.componentInstance;
    service = TestBed.get(DeploymentResponseDataService);
    modal = TestBed.get(ModalCreatedUserComponent);
  });

  afterEach(() => {
    component = null;
    fixture = null;
    sessionStorage.clear();
  });

  it('should create', async(() => {
    spyOn(component, 'ngOnInit').and.returnValue(null);
    expect(component).toBeDefined();
  }));

  it('should reset data and stack Arrays and subscribeToSocket during ngOnInit()', () => {
    spyOn(component, 'subscribeToStackUpdates').and.callFake(() => { });
    component.ngOnInit();
    expect(component['id']).toBeDefined();
    expect(component['deployingStack']).toBeDefined();
    expect(component.subscribeToStackUpdates).toHaveBeenCalledTimes(1);
  });
});
