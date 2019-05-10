import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LabBuilderComponent } from '../pages/labs/lab-builder.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ModalConfigurationComponent } from '../pages/modal/modal-configuration';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { ConfigDataService } from '../data-service/configuration-data.service';
import { LabsApiService } from '../api/labs/labs-api.service';

describe('LabBuilderComponent', () => {

  let component: LabBuilderComponent;
  let fixture: ComponentFixture<LabBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabBuilderComponent],
      imports: [RouterTestingModule, DataTableModule],
      providers: [LabsApiService, HttpClient, HttpHandler,
        NgbActiveModal, NgbModal, NgbModalStack, ConfigDataService, ModalConfigurationComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().catch(error => console.error(error));

    // create test fixture
    fixture = TestBed.createComponent(LabBuilderComponent);
    // get component from fixture
    component = fixture.componentInstance;
  });

  afterEach(() => {
    component = null;
    fixture = null;
  });

  it(`should create`, async(() => {
    spyOn(component, 'ngOnInit').and.returnValue(null);
    expect(component).toBeDefined();
  }));
});
