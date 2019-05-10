import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DeletedListComponent } from '../pages/labs/deleted-list.component';
import { LabsApiService } from '../api/labs/labs-api.service';

describe('DeletedListComponent', () => {

  let component: DeletedListComponent;
  let fixture: ComponentFixture<DeletedListComponent>;
  let apiservice = LabsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletedListComponent],
      imports: [RouterTestingModule, DataTableModule],
      providers: [LabsApiService, HttpClient, HttpHandler],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().catch(error => console.error(error));

    // create test fixture
    fixture = TestBed.createComponent(DeletedListComponent);

    // get component from fixture
    component = fixture.componentInstance;
    apiservice = TestBed.get(LabsApiService);
  });

  afterEach(() => {
    component = null;
    fixture = null;
  });

  it('should return boolean value when calling isLoading()', () => {
    spyOn(component, 'isLoading').and.callThrough();
    component['labsLoading'] = true;
    const res = component.isLoading();
    expect(res).toBe(true);
    component.labsLoading = false;
    const res2 = component.isLoading();
    expect(res2).toBe(false);
  });

  it('should call getDeployedLabs once during ngOnInit()', async(() => {
    spyOn(component, 'getDeletedLabs').and.returnValue(null);
    component.ngOnInit();
    expect(component.getDeletedLabs).toHaveBeenCalledTimes(1);
  }));

  it('should return true value when calling isDeletedLabsZero if there are no labs', () => {
    spyOn(component, 'isDeletedLabsZero').and.callThrough();
    component['DELETED_LABS'] = [];
    const res = component.isDeletedLabsZero();
    expect(res).toBe(true);
  });

  it('should navigate to new page when OnGetLogs() is called', () => {
    spyOn(component, 'onGetLogs').and.callThrough();
    spyOn(component['router'], 'navigateByUrl').and.callFake(() => { });
    component.onGetLogs(1);
    expect(component['router'].navigateByUrl).toHaveBeenCalledTimes(1);
  });

  it('should populate with deletedLabs during getDeletedLabs()', (async () => {
    const obj = JSON.parse('[{"name":"LABS/testLab", "status":"DELETED", "id" : "1"}]');
    spyOn(component['labsApi'], 'getDeletedLabs').and.callFake(() => Promise.resolve(obj));
    component.getDeletedLabs();
    fixture.whenStable().then(() => {
      expect(component['DELETED_LABS'].length).toBe(1);
    });
  }));
});
