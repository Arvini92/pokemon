import { TestBed } from '@angular/core/testing';

import { CheckPokemonService } from './check-pokemon.service';

describe('CheckPokemonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckPokemonService = TestBed.get(CheckPokemonService);
    expect(service).toBeTruthy();
  });
});
