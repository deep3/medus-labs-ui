import { TestBed, inject } from '@angular/core/testing';

import { SocketService } from '../socket.service';
import { DeploymentResponseDataService } from '../data-service/deployment-response-data.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketService, DeploymentResponseDataService]
    });
  });

  it('should be created', inject([SocketService], (service: SocketService) => {
    expect(service).toBeTruthy();
  }));
});
