import { Component, OnInit } from '@angular/core';
import { PokeDataService } from '../poke-data.service';
import { FavoritesService } from '../favorites.service';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: Array<any>;
  actualPage: number;
  next: string;
  previous: string;
  search: string;
  showAll: boolean;
  constructor(private pokeData: PokeDataService, private favoritesService: FavoritesService) {
    this.pokemons = [];
    this.actualPage = 1;
    this.search = '';
    this.showAll = false;
  }

  ngOnInit(): void {
    this.pokeData.getPokemons().then((data) => {
      this.pokemons = data.pokemons;
      this.next = data.next;
      this.previous = data.previous;
      console.log(data);
    });
  }

  showFirstPage(){
    this.pokeData.getPokemons().then((data) => {
      this.pokemons = data.pokemons;
      this.next = data.next;
      this.previous = data.previous;
      this.actualPage = 1;
      this.search = '';
      this.showAll = false;
    });
  }
  pagination(url: string, next: boolean) {
    this.pokeData.getPokemons(url).then((data) => {
      this.pokemons = data.pokemons;
      this.next = data.next;
      this.previous = data.previous;
      this.actualPage = next ? this.actualPage + 1 : this.actualPage - 1;
      console.log(data);
    });
  }

  addFavorite(id: number){
    this.favoritesService.addPokemon(id);
    if (this.favoritesService.isInFavorites(id)){
        const pokemon = this.pokemons.find(item => item.id === id);
        pokemon.favorites = true;
    }
  }
  deleteFavorite(id: number){
    this.favoritesService.deletePokemon(id);
    if (!this.favoritesService.isInFavorites(id)){
        const pokemon = this.pokemons.find(item => item.id === id);
        pokemon.favorites = false;
    }
  }
  searchPokemon(){
    const search = this.search.toLowerCase();

    this.pokeData.findPokemon(search).then((data) => {
      this.pokemons = data.pokemons;
      this.actualPage = 0;
      this.next = null;
      this.previous = null;
      this.showAll = true;
    })
    .catch(error => {
      this.pokemons = [];
      this.actualPage = 0;
      this.next = null;
      this.previous = null;
      this.showAll = true;
    });
  }

}
