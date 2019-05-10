import { ModalCreatedUserComponent } from '../pages/modal/modal-createdstudent';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableModule } from 'angular-6-datatable';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { ConfigDataService } from '../data-service/configuration-data.service';
import { ModalConfigurationComponent } from '../pages/modal/modal-configuration';
import { NO_ERRORS_SCHEMA, } from '@angular/core';
import { DeploymentResponseDataService } from '../data-service/deployment-response-data.service';
import { CreatedStudentModel } from '../data-models/created-student-model.model';
import { LabsApiService } from '../api/labs/labs-api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ModalCreatedUserComponent', () => {

  let component: ModalCreatedUserComponent;
  let fixture: ComponentFixture<ModalCreatedUserComponent>;
  let service: NgbModal;
  let depService: DeploymentResponseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCreatedUserComponent],
      imports: [RouterTestingModule, DataTableModule],
      providers: [NgbActiveModal, NgbModal, NgbModalStack,
        ScrollBar, ConfigDataService, ModalConfigurationComponent, DeploymentResponseDataService, LabsApiService,
        HttpClient, HttpHandler
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().catch(error => console.error(error));

    fixture = TestBed.createComponent(ModalCreatedUserComponent);

    // get component from fixture
    component = fixture.componentInstance;
    service = TestBed.get(NgbModal);
    depService = TestBed.get(DeploymentResponseDataService);

  });

  afterEach(() => { });

  it('should create', async(() => {
    spyOn(component, 'getStudentsData').and.returnValue(null);
    expect(component).toBeDefined();
  }));

  it('should call getStudentsData() and getDeployedLabData() during ngOnInit()', async(() => {
    spyOn(component, 'getStudentsData').and.returnValue(null);
    spyOn(component, 'getDeployedLabData').and.returnValue(null);
    spyOn(depService, 'getUserCredentialsBasedUponId').and.callFake(() => { });
    component.ngOnInit();
    expect(component.getStudentsData).toHaveBeenCalledTimes(1);
    expect(component.getDeployedLabData).toHaveBeenCalledTimes(1);
  }));

  it('should return a ModalRef when calling getModalRef()', async(() => {
    spyOn(component, 'getModalRef').and.callThrough();
    component.getModalRef();
    expect(component.getModalRef).toHaveBeenCalledTimes(1);
    expect(component.getModalRef).toBeDefined();
  }));

  it('should call onPrint() when "Print" button is clicked', async(() => {
    spyOn(component, 'onPrint').and.returnValue(true);

    const button = fixture.debugElement.nativeElement.querySelector('#printbutton');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onPrint).toHaveBeenCalled();
    });
  }));

  it('should get the created students data when calling getStudentsData()', () => {
    spyOn(component['deploymentResponse'], 'getUserCredentialsBasedUponId').and.returnValue(CreatedStudentModel);
    component['STUDENT_DATA'] = [];
    component.getStudentsData();
    expect(component['STUDENT_DATA']).toBeTruthy();
  });
});
