import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupComponent } from '../pages/setup/setup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { OrganisationsApiService } from '../api/organisations/organisations-api.service';


describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetupComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [OrganisationsApiService, HttpClient, HttpHandler, NgbModal, NgbModalStack, ScrollBar]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
