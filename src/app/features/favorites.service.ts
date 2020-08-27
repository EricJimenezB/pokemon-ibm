import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private numberFavorites: BehaviorSubject<number>;
  private idFavorites: string ;
  changeNumberFavorites: Observable<number>;

  constructor(private auth: AuthService) {
    this.idFavorites = auth.getUser().favoritesID;
    this.numberFavorites = new BehaviorSubject<number>(this.getNumberFavorites());
    this.changeNumberFavorites = this.numberFavorites.asObservable();
  }

  getFavorites(){
    let pokemons = [];
    if ( localStorage.getItem(this.idFavorites) != null){
      pokemons = JSON.parse(localStorage.getItem(this.idFavorites));
    }
    return pokemons;
  }
  getNumberFavorites(){
    let pokemons = [];
    if ( localStorage.getItem(this.idFavorites) != null){
      pokemons = JSON.parse(localStorage.getItem(this.idFavorites));
    }
    return pokemons.length;
  }
  isInFavorites(id: number) {
    let pokemons = [];
    if ( localStorage.getItem(this.idFavorites) != null){
      pokemons = JSON.parse(localStorage.getItem(this.idFavorites));
    }
    else{
      return false;
    }
    const pokemonsaux = JSON.stringify(pokemons);
    if (pokemonsaux.includes(JSON.stringify({id}))){
      return true;
    }
    return false;
  }

  addPokemon(id: number) {
    let pokemons = [];
    if ( localStorage.getItem(this.idFavorites) != null){
      pokemons = JSON.parse(localStorage.getItem(this.idFavorites));
      const pokemonsaux = JSON.stringify(pokemons);
      if (!pokemonsaux.includes(JSON.stringify({id}))){
        pokemons.push({id});
        localStorage.setItem(this.idFavorites, JSON.stringify(pokemons));
      }
    }
    else{
      pokemons.push({id});
      localStorage.setItem(this.idFavorites, JSON.stringify(pokemons));
    }
    this.numberFavorites.next(pokemons.length);
  }

  deletePokemon(id: number) {
    let pokemons = [];
    if ( localStorage.getItem(this.idFavorites) != null){
      pokemons = JSON.parse(localStorage.getItem(this.idFavorites));
      pokemons = pokemons.filter(
        item => {
          return item.id !== id;
        }
      );
      localStorage.setItem(this.idFavorites, JSON.stringify(pokemons));
    }
    this.numberFavorites.next(pokemons.length);
  }
}
