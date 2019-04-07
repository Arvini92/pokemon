import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from './pokemon.service';

@Injectable()
export class GetPokemonsService {

  constructor(
    private httpClient: HttpClient,
    private pokemonService: PokemonService,
  ) { }

  getMorePokemonsDetails(id: number) {
    this.getPokemon(id);
    let prev = id - 1;
    let next = id + 1;
    if(prev > 0) {
      this.getPokemon(prev);
    }
    this.getPokemon(next);
    let first = 0;
    this.getPokemons(first, prev - 1);
    let last = next < 12 ? 12 : Math.round(next /12) * 12;
    this.getPokemons(next, last);
  }

  getMorePokemons() {
    let first = this.pokemonService.getPokemonsCount();
    let last = first + 12;
    this.getPokemons(first, last);
  }

  getPokemons(first: number, last: number) {
    for(let i = first; i < last; i++) {
      this.getPokemon(i + 1);
    }
  }

  getPokemon(i: number) {
    this.httpClient.get('https://pokeapi.co/api/v2/pokemon/' + i).subscribe(
      (data: any) => {
        this.pokemonService.setPokemon(data);
      }
    );
  }

}
