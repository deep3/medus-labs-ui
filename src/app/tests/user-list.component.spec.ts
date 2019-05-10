import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { ModalCreatedUserComponent } from '../pages/modal/modal-createdstudent';
import { ListComponent } from '../pages/users/list.component';
import { UserManagementDataService } from '../data-service/user-management-data.service';
import { FontAwesomeBoolPipe } from '../font-awesome-bool.pipe';
import { UsersApiService } from '../api/user/users-api.service';
import { ModalOptionsComponent } from '../pages/modal/modal-options';

describe('ListComponent', () => {

  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: UsersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [RouterTestingModule, DataTableModule],
      providers: [UsersApiService, HttpClient, HttpHandler,
        NgbActiveModal, NgbModal, NgbModalStack,
        ScrollBar, ModalCreatedUserComponent,
        UserManagementDataService, FontAwesomeBoolPipe, ModalOptionsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().catch(error => console.error(error));

    // create test fixture
    fixture = TestBed.createComponent(ListComponent);
    // get component
    component = fixture.componentInstance;
    service = TestBed.get(UsersApiService);
  });

  afterEach(() => {
    component = null;
    fixture = null;
  });

  it(`should create`, async(() => {
    expect(component).toBeDefined();
  }));

  it('should populate during ngOnInit', () => {
    spyOn(component, 'getListData').and.callFake(() => { });
    component.ngOnInit();

    expect(component.getListData).toHaveBeenCalledTimes(1);
  });

  it('should populate with accounts during getListData()', (async () => {
    const obj = JSON.parse('[{"username":"testuser", "id" : "1", "enabled":"true"}]');
    spyOn(service, 'getAccountsList').and.callFake(() => Promise.resolve(obj));
    component.getListData();

    fixture.whenStable().then(() => {
      expect(component['USER_DATA'].length).toBe(1);
    });
  }));

  it('should not delete if confirm is false', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(service, 'deleteUser').and.callFake(() => { });
    component.onDelete(1);

    expect(service.deleteUser).toHaveBeenCalledTimes(0);
  });

  it('should delete if confirm is true and user exists', () => {
    const obj = JSON.parse('{"username":"testuser", "id" : 1, "enabled":"true"}');
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(service, 'deleteUser').and.callFake(() => { });
    component['USER_DATA'].push(obj);
    component.onDelete(1);

    expect(service.deleteUser).toHaveBeenCalledTimes(1);
  });

  it('should not delete if confirm is true and user does not exist', () => {
    const obj = JSON.parse('{"username":"testuser", "id" : 1, "enabled":"true"}');
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(service, 'deleteUser').and.callFake(() => { });
    component['USER_DATA'].push(obj);
    component.onDelete(2);

    expect(service.deleteUser).toHaveBeenCalledTimes(1);
  });

  it('should open failure modal if onModify is selected for unknown user', () => {
    spyOn(component['modal'], 'open').and.callFake(() => { });
    component.onModify(null);

    expect(component['modal'].open).toHaveBeenCalledTimes(1);
  });

  it('should modify user if onModify is selected for known user', () => {
    spyOn(component['modal'], 'open').and.callFake(() => { });
    spyOn(component['data'], 'sendModel').and.callFake(() => { });
    spyOn(component['router'], 'navigateByUrl').and.callFake(() => { });
    const obj = JSON.parse('{"username":"testuser", "id" : 1, "enabled":"true"}');
    component.onModify(obj);

    expect(component['modal'].open).toHaveBeenCalledTimes(0);
    expect(component['data'].sendModel).toHaveBeenCalledTimes(1);
  });
});
