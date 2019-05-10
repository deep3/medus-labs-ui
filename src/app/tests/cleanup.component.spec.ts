import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CleanupComponent } from '../pages/cleanup/cleanup.component';
import { HttpHandler, HttpClientModule } from '@angular/common/http';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { UsersApiService } from '../api/user/users-api.service';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { OrganisationsApiService } from '../api/organisations/organisations-api.service';

describe('CleanupComponent', () => {
  let component: CleanupComponent;
  let fixture: ComponentFixture<CleanupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CleanupComponent],
      imports: [HttpClientModule],
      providers: [NgbActiveModal, NgbModal, NgbModalStack, UsersApiService, HttpHandler, NgbModalModule,
        ScrollBar, OrganisationsApiService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return boolean value when calling isLoading()', () => {
    spyOn(component, 'isLoading').and.callThrough();
    component.loading = true;
    const res = component.isLoading();
    expect(res).toBe(true);
    component.loading = false;
    const res2 = component.isLoading();
    expect(res2).toBe(false);
  });
});
