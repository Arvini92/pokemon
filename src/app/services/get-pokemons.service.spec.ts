import { TestBed } from '@angular/core/testing';

import { GetPokemonsService } from './get-pokemons.service';

describe('GetPokemonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetPokemonsService = TestBed.get(GetPokemonsService);
    expect(service).toBeTruthy();
  });
});
