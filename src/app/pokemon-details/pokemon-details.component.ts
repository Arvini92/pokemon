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
    this.pokemon = new Pokemon("", "", [], [], [], "", "", []);
    this.pokemonPrev = new Pokemon("", "", [], [], [], "", "", []);
    this.pokemonNext = new Pokemon("", "", [], [], [], "", "", []);
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if(this.pokemonService.isPokemonsEmpty()) {
          this.getPokemonsService.getMorePokemonsDetails(this.id);
        } else {
          this.pokemon = this.pokemonService.getPokemon(this.id - 1);
          this.pokemonPrev = this.pokemonService.getPokemon(this.id - 2);
          if(this.pokemonService.getPokemon(this.id)) {
            this.pokemonNext = this.pokemonService.getPokemon(this.id);
          } else {
            this.getPokemonsService.getMorePokemons();
          }
          
          console.log('this.pokemonNext', this.pokemonNext)
        }
        console.log("params['id']", params['id']);
      }
    );
    this.pokemonSubscription = this.pokemonService.pokemonFound
      .subscribe(
        (pokemon: Pokemon) => {
          // console.log('pokemon', pokemon)
          if(+pokemon.id == this.id) {
            this.pokemon = pokemon;
          }
          if(+pokemon.id == this.id - 1) {
            this.pokemonPrev = pokemon;
          }
          if(+pokemon.id == this.id + 1) {
            this.pokemonNext = pokemon;
          }
          // console.log('this.pokemon', this.pokemon)
          // console.log('this.pokemonPrev', this.pokemonPrev)
          // console.log('this.pokemonNext', this.pokemonNext)
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.pokemonSubscription.unsubscribe();
  }

  chooseLeftClass(pokemon: Pokemon) {
    if(pokemon.types[0]) {
      this.leftCssClass = pokemon.types[0];
    } else {
      this.leftCssClass = 'hidden';
    }

  }

  chooseRightClass(pokemon: Pokemon) {
    if(pokemon.types[1]) {
      this.rightCssClass = pokemon.types[1];
    } else {
      this.rightCssClass = 'hidden';
    }
  }

}
