import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataTableModule } from 'angular-6-datatable';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { LogListComponent } from '../pages/labs/lab-logs.component';
import { LabsApiService } from '../api/labs/labs-api.service';

describe('LogListComponent', () => {

  let component: LogListComponent;
  let fixture: ComponentFixture<LogListComponent>;
  let apiservice: LabsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogListComponent],
      imports: [RouterTestingModule, DataTableModule],
      providers: [LabsApiService, HttpClient, HttpHandler],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().catch(error => console.error(error));

    // create test fixture
    fixture = TestBed.createComponent(LogListComponent);
    // get component
    component = fixture.componentInstance;
    apiservice = TestBed.get(LabsApiService);
  });

  afterEach(() => {
    component = null;
    fixture = null;
  });

  it(`should create`, async(() => {
    expect(component).toBeDefined();
  }));

  it('should return boolean value when calling isLoading()', () => {
    spyOn(component, 'isLoading').and.callThrough();
    component['logsLoading'] = true;
    const res = component.isLoading();
    expect(res).toBe(true);
    component.logsLoading = false;
    const res2 = component.isLoading();
    expect(res2).toBe(false);
  });

  it('should get selected Lab and populate with Logs during ngOnInit()', () => {
    spyOn(component, 'getLogs').and.callFake(() => { });
    component.ngOnInit();
    expect(component.getLogs).toHaveBeenCalledTimes(1);
  });

  it('should populate local array when calling getLogs()', () => {
    const obj = JSON.parse('[{"id":"100", "logLevel":"WARNING", "message" : "this is a message", "date" : "12-10-2012"}]');
    spyOn(component, 'getLogs').and.callThrough();
    spyOn(apiservice, 'getDeployedLabLogs').and.callFake(() => Promise.resolve(obj));
    component.getLogs(1);
    expect(component['LOGS']).toBeTruthy();
    expect(apiservice.getDeployedLabLogs).toHaveBeenCalledTimes(1);
    expect(component.getLogs).toHaveBeenCalledTimes(1);
  });

  it('should only populate local array when lab has been selected', () => {
    const obj = JSON.parse('[{"id":"100", "logLevel":"WARNING", "message" : "this is a message", "date" : "12-10-2012"}]');
    spyOn(component, 'getLogs').and.callThrough();
    spyOn(apiservice, 'getDeployedLabLogs').and.callFake(() => Promise.resolve(obj));
    component.getLogs(1);
    expect(component['logsLoading']).toBe(true);
  });

  it('should call onPrint() when "Print" button is clicked', async(() => {
    spyOn(component, 'onPrint').and.returnValue(true);

    const button = fixture.debugElement.nativeElement.querySelector('#printbutton');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onPrint).toHaveBeenCalled();
    });
  }));
});
