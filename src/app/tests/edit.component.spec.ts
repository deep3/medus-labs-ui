import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EditComponent } from '../pages/users/edit.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ModalOptionsComponent } from '../pages/modal/modal-options';
import { UserManagementDataService } from '../data-service/user-management-data.service';
import { ErrorDataService } from '../data-service/error-data.service';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersApiService } from '../api/user/users-api.service';

describe('EditUserComponent', () => {

  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [RouterTestingModule, DataTableModule, ReactiveFormsModule, FormsModule, NgbModule.forRoot()],
      providers: [UsersApiService, HttpClient, HttpHandler,
        ModalOptionsComponent, RouterTestingModule, ErrorDataService, UserManagementDataService, ModalOptionsComponent, NgbActiveModal],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().catch(error => console.error(error));

    // create test fixture
    fixture = TestBed.createComponent(EditComponent);
    // get component from fixture
    component = fixture.componentInstance;
  });

  afterEach(() => {
    component = null;
    fixture = null;
  });

  it(`should create`, async(() => {
    expect(component).toBeDefined();
  }));

  it('should call validate() once in onSubmit()', () => {
    spyOn(component, 'validate').and.returnValue(false);
    component.onSubmit();
    expect(component.validate).toHaveBeenCalledTimes(1);
  });

  it('should call resetData() once in onDestroy()', () => {
    spyOn(component, 'resetData');
    component.ngOnDestroy();
    expect(component.resetData).toHaveBeenCalledTimes(1);
  });
});
