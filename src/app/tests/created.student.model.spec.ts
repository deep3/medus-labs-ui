import { async } from '@angular/core/testing';
import { CreatedStudentModel } from '../data-models/created-student-model.model';

describe('CreatedStudentModel', () => {

  let service: CreatedStudentModel;

  beforeEach(() => {
    service = new CreatedStudentModel('test-username', 'test-password', 'test-login');
  });

  afterEach(() => {
    service = null;
  });

  it(`should create `, async(() => {
    expect(service).toBeDefined();
  }));
});
