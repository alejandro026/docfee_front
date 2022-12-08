import { TestBed } from '@angular/core/testing';

import { CerrarSessionService } from './cerrar-session.service';

describe('CerrarSessionService', () => {
  let service: CerrarSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CerrarSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
