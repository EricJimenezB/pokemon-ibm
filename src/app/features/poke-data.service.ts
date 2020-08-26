import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoritesService } from './favorites.service';

@Injectable({
  providedIn: 'root'
})
export class PokeDataService {
  url: string;
  constructor(private httpClient: HttpClient , private favoritesService: FavoritesService) { 
    this.url = 'https://pokeapi.co/api/v2/pokemon/';
  }

  findPokemon(name: string): Promise<any>{
    const arrPoke = [];

    return this.httpClient.get(this.url + name).toPromise()
    .then(item => {
      console.log(item);
      item.favorites = this.favoritesService.isInFavorites(item.id);
      arrPoke.push(item);
      return { pokemons:  arrPoke };
    });
  }

  getPokemons(url: string = this.url): Promise<any>{
    const arrPoke = [];
    let next = '';
    let previous = '';

    return this.httpClient.get(url).toPromise()
    .then(data => {
      next = data.next;
      previous = data.previous;
      return data.results
    })
      .then(items => items.map((item) => {
        return this.httpClient.get(item.url).toPromise();
      })).then((poke) => {
        poke.forEach(element => {
          element.then(item => {
            item.favorites = this.favoritesService.isInFavorites(item.id);
            arrPoke.push(item);
          });
        });
        return { next, previous, pokemons:  arrPoke };
      });
  }
}
