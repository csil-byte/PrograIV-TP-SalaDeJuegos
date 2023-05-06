import { TestBed } from '@angular/core/testing';

import { GetFotosService } from './get-fotos.service';

describe('GetFotosService', () => {
  let service: GetFotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
