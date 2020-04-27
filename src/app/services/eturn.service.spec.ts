import { TestBed } from '@angular/core/testing';

import { EturnService } from './eturn.service';

describe('EturnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EturnService = TestBed.get(EturnService);
    expect(service).toBeTruthy();
  });
});
