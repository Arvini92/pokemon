import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemonChanged = new Subject<Pokemon[]>();
  pokemonFound = new Subject<Pokemon>();
  pokemons: Pokemon[] = [];

  constructor() { }

  setPokemon(data: any) {
    let pokemon = new Pokemon(
      data.name, 
      data.id,
      this.getTypes(data.types),
      this.getMoves(data.moves),
      this.getStats(data.stats),
      data.weight,
      data.height,
      this.getAbilities(data.abilities)
    );
    this.pokemons.push(pokemon);
    this.sortPokemons();
    this.pokemonFound.next(pokemon);
    this.pokemonChanged.next(this.pokemons.slice());
  }

  getPokemon(index: number) {
    console.log("getPokemon", index);
    console.log(this.pokemons);
    return this.pokemons[index];
    // this.pokemonFound.next(this.pokemons[index]);
  }

  getTypes(types: any[]) {
    let _types : string[] = [];
    if(types.length === 2) {
      _types[0] = types[1].type.name;
      _types[1] = types[0].type.name;
    } else {
      _types[0] = types[0].type.name;
    }
    return _types;
  }

  getMoves(moves: any[]) {
    let _moves : string[] = [];
    moves.map((move) => {
      _moves.push(move.move.name);
    });
    return _moves;
  }

  getStats(stats: any[]) {
    let _stats : any[] = [];
    stats.map((stat) => {
      _stats.push({
        name: stat.stat.name,
        base_stat: stat.base_stat
      });
    });
    return _stats;
  }

  getAbilities(abilities: any[]) {
    let _abilities : string[] = [];
    abilities.map((ability) => {
      if(!ability.is_hidden) {
        _abilities.push(ability.ability.name);
      }
    });
    return _abilities;
  }

  sortPokemons() {
    this.pokemons.sort(function(a: any, b: any) { 
        return a.id - b.id;
    });
  }

  getPokemonsCount() {
    return this.pokemons.length;
  }

  isPokemonsEmpty() {
    console.log(this.pokemons.length === 0);
    return this.pokemons.length === 0;
  }
}
