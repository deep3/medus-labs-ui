import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalWipedAllComponent } from '../pages/modal/modal-wiped-all/modal-wiped-all.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { OrganisationsApiService } from '../api/organisations/organisations-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';

describe('ModalWipedAllComponent', () => {
  let component: ModalWipedAllComponent;
  let fixture: ComponentFixture<ModalWipedAllComponent>;
  // tslint:disable-next-line:prefer-const
  let http: HttpClient;
  const success = '16';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalWipedAllComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [OrganisationsApiService, NgbModal, NgbModalStack, ScrollBar, NgbModalBackdrop]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWipedAllComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => { });

  it('should create', () => {
    spyOn(component, 'ngOnInit').and.callFake(() => {});
    expect(component).toBeTruthy();
  });

  it('should return true by default when calling isLoading()', () => {
    spyOn(component, 'isLoading').and.callThrough();
    const res = component.isLoading();
    expect(res).toBe(true);
  });

  it('should call wipeAllData once during ngOnInit()', async(() => {
    spyOn(component, 'wipeAllData').and.returnValue(null);
    component.ngOnInit();
    expect(component.wipeAllData).toHaveBeenCalledTimes(1);
  }));

  it('should update numberOfDeleted once the request has been processed', () => {
    spyOn(component, 'requestStatus').and.callThrough();
    component.wipeAllData();
    component.numberofdeleted = success;
    const res = component.requestStatus();
    expect(res).toEqual('16');
  });
});
