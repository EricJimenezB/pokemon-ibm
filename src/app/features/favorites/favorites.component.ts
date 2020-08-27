import { Component, OnInit } from '@angular/core';
import { PokeDataService } from '../poke-data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoritos: any;
  favoritosAux: any;
  search: string;
  searchby: string;
  searchEnable: boolean;
  error: boolean;
  constructor(private pokeData: PokeDataService) { 
    this.searchby = 'type';
  }

  ngOnInit(): void {
    this.pokeData.getAllFavorites().then(favoritos => {
      this.favoritos = favoritos;
    }).catch(e => {
      this.error = true;
    });
  }

  toogle(){
    this.search = '';
    this.searchPokemon();
  }
  searchPokemon(){
    if (this.favoritosAux === undefined){
      this.favoritosAux = JSON.stringify(this.favoritos);
      if (this.favoritos.length > 15){
        this.searchEnable = true;
      }
      else {
        this.searchEnable = false;
      }
    }
    this.favoritos = JSON.parse(this.favoritosAux);
    if (this.search === undefined){
      this.favoritos = JSON.parse(this.favoritosAux);
    }
    else{
      if (this.searchby === 'type'){
        this.favoritos = this.favoritos.filter(item => {
          return JSON.stringify(item.types).includes(this.search.toLowerCase());
        });
      }
      else {
        this.favoritos = this.favoritos.filter(item => {
          return JSON.stringify(item.moves).includes(this.search.toLowerCase());
        });
      }
    }
  }

}
