import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePokemonComponent } from './home-pokemon/home-pokemon.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

const appRoutes: Routes = [
  { path: '', component: HomePokemonComponent },
  { path: 'pokemon/:id', component: PokemonDetailsComponent },
  { path: '**', component: HomePokemonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
