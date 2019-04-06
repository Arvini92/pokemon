import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { GetPokemonsService } from './services/get-pokemons.service';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { HomePokemonComponent } from './home-pokemon/home-pokemon.component';
import { IdPipe } from './pipes/id.pipe';
import { PokemonService } from './services/pokemon.service';
import { CheckPokemonService } from './services/check-pokemon.service';
import { DecPipe } from './pipes/dec.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokemonDetailsComponent,
    HomePokemonComponent,
    IdPipe,
    DecPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    GetPokemonsService,
    PokemonService,
    CheckPokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
