import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableModule } from 'angular-6-datatable';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { ConfigDataService } from '../data-service/configuration-data.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ModalCreatedMemberAccountsComponent } from '../pages/modal/modal-createdmemberaccounts';
import { DeploymentResponseDataService } from '../data-service/deployment-response-data.service';
import { UsersApiService } from '../api/user/users-api.service';


describe('ModalCreatedMemberAccountsComponent', () => {

  let component: ModalCreatedMemberAccountsComponent;
  let fixture: ComponentFixture<ModalCreatedMemberAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCreatedMemberAccountsComponent],
      imports: [RouterTestingModule, DataTableModule, FormsModule],
      providers: [NgbActiveModal, NgbModal, NgbModalStack, UsersApiService, HttpClient, HttpHandler, NgbModalModule,
        ScrollBar, ConfigDataService, ModalCreatedMemberAccountsComponent, DeploymentResponseDataService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().catch(error => console.error(error));

    // create test fixture
    fixture = TestBed.createComponent(ModalCreatedMemberAccountsComponent);
    // get component from fixture
    component = fixture.componentInstance;

  });

  afterEach(() => { });

  it(`should create`, async(() => {
    expect(component).toBeDefined();
  }));

  it('should navigate to /accounts when close() is called', () => {
    spyOn(component['router'], 'navigate').and.callFake(() => { });
    component.close();
    expect(component['router'].navigate).toHaveBeenCalledTimes(1);
  });
});
