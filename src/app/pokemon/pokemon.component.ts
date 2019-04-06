import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  // pokemon: Pokemon;
  leftCssClass : string;
  rightCssClass : string;

  constructor() {}

  ngOnInit() {
    // console.log(this.pokemon);
    this.chooseLeftClass(this.pokemon);
    this.chooseRightClass(this.pokemon);
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

  @Input() pokemon: any;

}
