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
    let first = 0;
    let last = id < 12 ? 12 : Math.round(id /12) * 12;
    // console.log(first, last);
    this.getPokemons(first, last);
  }

  getMorePokemons() {
    let first = this.pokemonService.getPokemonsCount();
    let last = first + 12;
    // console.log(first, last);
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
        // console.log(data);
        this.pokemonService.setPokemon(data);
      }
    );
  }

}
