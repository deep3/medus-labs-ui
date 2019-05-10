import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountComponent } from '../pages/accounts/accounts.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { OrganisationsApiService } from '../api/organisations/organisations-api.service';

describe('AccountComponent', () => {

  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let service: OrganisationsApiService;

  // Run this before each test
  beforeEach(() => {
    // Configure the TestBed for the test
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [RouterTestingModule, DataTableModule],
      providers: [OrganisationsApiService, HttpClient, HttpHandler],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().catch(error => console.error(error));

    // create test fixture
    fixture = TestBed.createComponent(AccountComponent);
    // get component from fixture
    component = fixture.componentInstance;
    // get service from TestBed
    service = TestBed.get(OrganisationsApiService);
  });

  // Run this after each test
  afterEach(() => {
    component.validAccountsList = null;
    component.invalidAccountsList = null;
  });

  it(`should create`, async(() => {
    spyOn(component, 'getAccountsData').and.returnValue(null);
    spyOn(component, 'getInvalidAccountsData').and.returnValue(null);
    expect(component).toBeDefined();
  }));

  it('should call getAccounts and getInvalidAccountsData once during init()', async(() => {
    spyOn(component, 'getAccountsData');
    spyOn(component, 'getInvalidAccountsData');

    component.ngOnInit();
    expect(component.getAccountsData).toHaveBeenCalledTimes(1);
    expect(component.getInvalidAccountsData).toHaveBeenCalledTimes(1);
  }));

  it('should return boolean when isLoading() is called', () => {
    spyOn(component, 'isLoading').and.callThrough();
    const res = component.isLoading();
    expect(component.isLoading).toHaveBeenCalled();
    expect(res).toBeTruthy();
  });

  it('should return accounts from the API when calling getAccountsData()', async(() => {
    const obj = JSON.parse('[{"name":"testName", "status":"valid", "id" : "1"}]');

    spyOn(service, 'getMemberOrganisationAccounts').and.callFake(() => Promise.resolve(obj));
    spyOn(component, 'getAccountsData').and.callThrough();

    component.getAccountsData();

    fixture.whenStable().then(() => {
      expect(component.getAccountsData).toHaveBeenCalled();
      expect(component.validAccountsList).toBeDefined();
      expect(component.validAccountsList.length).toBe(1);
    });
  }));

  it('should return accounts from the API when calling getInvalidAccountsData()', async(() => {
    const obj = JSON.parse('[{"name":"testName", "status":"invalid", "id" : "1"}]');

    spyOn(service, 'getMemberOrganisationAccounts').and.callFake(() => Promise.resolve(obj));
    spyOn(component, 'getInvalidAccountsData').and.callThrough();

    component.getInvalidAccountsData();

    fixture.whenStable().then(() => {
      expect(component.getInvalidAccountsData).toHaveBeenCalled();
      expect(component.invalidAccountsList).toBeDefined();
      expect(component.invalidAccountsList.length).toBe(1);
    });
  }));
});
