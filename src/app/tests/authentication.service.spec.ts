import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DeploymentResponseDataService } from '../data-service/deployment-response-data.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthenticationService, HttpClient, HttpHandler, DeploymentResponseDataService]
    });

    // Get Service From TestBed
    service = TestBed.get(AuthenticationService);
  });

  afterEach(() => {
    localStorage.removeItem('currentUser');
  });

  it('should place token in localStorage when performing login()', () => {
    expect(localStorage.getItem('currentUser')).toBeNull();
    spyOn(service, 'login').and.returnValue(localStorage.setItem('currentUser', '12345'));
    service.login('user', 'password');
    expect(localStorage.getItem('currentUser')).toBeTruthy();
  });

  it('should remove token from localStorage when performing logout()', () => {
    localStorage.setItem('currentUser', '12345');
    service.logout();
    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  it('should parse username from JSON object when performing getUsername()', () => {
    const username = 'username';
    const token = '12345.ABCDE.VWXYZ';
    localStorage.setItem('currentUser', JSON.stringify({ username, token }));
    expect(service.getUsername()).toEqual('username');
  });
});
