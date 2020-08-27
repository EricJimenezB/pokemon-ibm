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

  getAllFavorites(){
    const favorites = this.favoritesService.getFavorites();
    return new Promise((resolve, reject) => {
      if (favorites.length === 0){
        reject(favorites);
      }
      else{
        let allFavorites = [];
        favorites.forEach(item => {
          let infoPoke: any;
          this.httpClient.get(this.url + item.id).toPromise()
          .then((poke: any) => {
            infoPoke = poke;
            this.httpClient.get(poke.location_area_encounters).toPromise().then(locations => {
              infoPoke.locations_areas = locations;
              allFavorites.push(infoPoke);
            });
          });
        });
        console.log(allFavorites);
        resolve(allFavorites);
      }
    });
   }

  findPokemon(name: string): Promise<any>{
    const arrPoke = [];

    return this.httpClient.get(this.url + name).toPromise()
    .then((item: any) => {
      console.log(item);
      item.favorites = this.favoritesService.isInFavorites(item.id);
      arrPoke.push(item);
      return { pokemons:  arrPoke };
    });
  }

  getPokemons(url: string = this.url): Promise<any>{
    let arrPoke = [];
    let next = '';
    let previous = '';

    return this.httpClient.get(url).toPromise()
    .then((data: any) => {
      next = data.next;
      previous = data.previous;
      return data.results;
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
