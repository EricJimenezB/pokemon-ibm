import { TestBed } from '@angular/core/testing';

import { WelcomePokeService } from './welcome-poke.service';

describe('WelcomePokeService', () => {
  let service: WelcomePokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelcomePokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
