import { Component, OnInit } from '@angular/core';
import { GetPokemonsService } from '../services/get-pokemons.service';
import { Pokemon } from '../models/pokemon.model';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemonSubscription: Subscription;
  pokemon : Pokemon;
  pokemonPrev : Pokemon;
  pokemonNext : Pokemon;
  id: number;
  leftCssClass : string;
  rightCssClass : string;

  constructor(
    private getPokemonsService: GetPokemonsService,
    private pokemonService: PokemonService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getItClear();
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if(this.pokemonService.isPokemonsEmpty()) {
          this.getPokemonsService.getMorePokemonsDetails(this.id);
        } else {
          this.getItClear();
          this.pokemon = this.pokemonService.getPokemon(this.id - 1);
          if(this.pokemonService.getPokemon(this.id - 2)) {
            this.pokemonPrev = this.pokemonService.getPokemon(this.id - 2);
            this.leftCssClass = '';
          }
          if(this.pokemonService.getPokemon(this.id)) {
            this.pokemonNext = this.pokemonService.getPokemon(this.id);
          } else {
            this.getPokemonsService.getMorePokemons();
          }
        }
      }
    );
    
    this.pokemonSubscription = this.pokemonService.pokemonFound
      .subscribe(
        (pokemon: Pokemon) => {
          if(+pokemon.id == this.id) {
            this.pokemon = pokemon;
          }
          if(+pokemon.id == this.id - 1) {
            this.pokemonPrev = pokemon;
            this.leftCssClass = '';
          }
          if(+pokemon.id == this.id + 1) {
            this.pokemonNext = pokemon;
          }
        }
      );
  }

  ngOnDestroy() {
    this.pokemonSubscription.unsubscribe();
  }

  getItClear() {
    this.pokemon = new Pokemon("", "", [], [], [], "", "", []);
    this.pokemonPrev = new Pokemon("", "", [], [], [], "", "", []);
    this.pokemonNext = new Pokemon("", "", [], [], [], "", "", []);
    this.leftCssClass = 'hidden';
  }

}
