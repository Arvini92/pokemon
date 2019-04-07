import { Component, OnInit, HostListener } from '@angular/core';
import { GetPokemonsService } from '../services/get-pokemons.service';
import { Pokemon } from '../models/pokemon.model';
import { Subscription } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home-pokemon',
  templateUrl: './home-pokemon.component.html',
  styleUrls: ['./home-pokemon.component.css']
})
export class HomePokemonComponent implements OnInit {

  subscription: Subscription;
  pokemons: Pokemon[] = [];
  loadMoreClicked: boolean = false;

  constructor(
    private getPokemonsService: GetPokemonsService,
    private pokemonService: PokemonService,
  ) {}

  ngOnInit() {
    this.subscription = this.pokemonService.pokemonChanged
      .subscribe(
        (pokemons: Pokemon[]) => {
          this.pokemons = pokemons;
        }
      );
    if(this.pokemonService.isPokemonsEmpty()) {
      this.getPokemonsService.getMorePokemons();
    } else {
      this.pokemonService.getPokemons();
    }
  }

  loadMore() {
    this.loadMoreClicked = true;
    this.getPokemonsService.getMorePokemons();
  }

  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event: any) {
    let checkEndOfPage = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    if (checkEndOfPage && this.loadMoreClicked) {
      this.getPokemonsService.getMorePokemons();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
