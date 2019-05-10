import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DeploymentResponseDataService } from '../data-service/deployment-response-data.service';
import { UserManagementDataService } from '../data-service/user-management-data.service';

describe('UserManagementDataService', () => {
  let service: UserManagementDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [UserManagementDataService, HttpClient, HttpHandler, DeploymentResponseDataService]
    });

    // Get Service From TestBed
    service = TestBed.get(UserManagementDataService);

  });

  afterEach(() => {});

  it('should send name data to message source when called', () => {
    spyOn(service['usernameDataMessageSource'], 'next').and.callFake(() => { });
    service.sendNameData('usernamedata');

    expect(service['usernameDataMessageSource'].next).toHaveBeenCalledTimes(1);
  });

  it('should send id data to message source when called', () => {
    spyOn(service['userIdDataMessageSource'], 'next').and.callFake(() => { });
    service.sendIdData('userid');

    expect(service['userIdDataMessageSource'].next).toHaveBeenCalledTimes(1);
  });

  it('should send model, populating name and ID when called', () => {
    spyOn(service['userIdDataMessageSource'], 'next').and.callFake(() => { });
    spyOn(service['usernameDataMessageSource'], 'next').and.callFake(() => { });
    const model = JSON.parse('{"username":"testuser", "id" : 1}');

    service.sendModel(model);

    expect(service['userIdDataMessageSource'].next).toHaveBeenCalledTimes(1);
    expect(service['usernameDataMessageSource'].next).toHaveBeenCalledTimes(1);
  });

  it('should detect if model is empty when sendModel called', () => {
    spyOn(service['userIdDataMessageSource'], 'next').and.callFake(() => { });
    spyOn(service['usernameDataMessageSource'], 'next').and.callFake(() => { });

    service.sendModel(null);

    expect(service['userIdDataMessageSource'].next).toHaveBeenCalledTimes(0);
    expect(service['usernameDataMessageSource'].next).toHaveBeenCalledTimes(0);
  });
});
