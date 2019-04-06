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
  subscription: Subscription;
  pokemon : Pokemon;
  pokemonPrev : Pokemon;
  pokemonNext : Pokemon;
  id: number;

  constructor(
    private getPokemonsService: GetPokemonsService,
    private pokemonService: PokemonService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.getPokemonsService.getMorePokemonsDetails(this.id);
        // this.pokemon = this.pokemonService.getPokemon(this.id - 1);
        console.log("params['id']", params['id']);
        // console.log(this.pokemon);
      }
    );
    this.subscription = this.pokemonService.pokemonChanged
      .subscribe(
        (pokemons: Pokemon[]) => {
          // console.log(pokemons)
          this.pokemon = pokemons[this.id - 1];
          // this.pokemonPrev = pokemons[this.id - 2];
          // this.pokemonNext = pokemons[this.id];
          // console.log(this.pokemon)
          // console.log(this.pokemonPrev)
          // console.log(this.pokemonNext)
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
