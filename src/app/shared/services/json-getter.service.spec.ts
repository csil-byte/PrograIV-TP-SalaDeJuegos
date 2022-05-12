import { TestBed } from '@angular/core/testing';

import { JsonGetterService } from './json-getter.service';

describe('JsonGetterService', () => {
  let service: JsonGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
