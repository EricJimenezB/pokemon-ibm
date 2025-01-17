import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FeaturesRoutingModule } from './features-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PokeDataService } from './poke-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PokemonListComponent, FavoritesComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [PokeDataService]
})
export class FeaturesModule { }
