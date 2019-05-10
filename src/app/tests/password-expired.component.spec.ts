import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { OrganisationsApiService } from '../api/organisations/organisations-api.service';
import { PasswordExpiredComponent } from '../pages/login/password-expired.component';
import { AuthenticationService } from '../authentication.service';
import { UsersApiService } from '../api/user/users-api.service';

describe('PasswordExpiredComponent', () => {
  let component: PasswordExpiredComponent;
  let fixture: ComponentFixture<PasswordExpiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordExpiredComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
      providers: [OrganisationsApiService, AuthenticationService, UsersApiService,
        HttpClient, HttpHandler]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
