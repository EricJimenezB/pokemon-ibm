import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WelcomePokeService {
  url: string;
  myPokemon: string;
  constructor(private httpClient: HttpClient) {
    this.url = 'https://pokeapi.co/api/v2/pokemon/';
   }

   getMyPokemon(name: string){
    let infoPoke = {};
    return this.httpClient.get(this.url + name).toPromise()
    .then(item => {
      infoPoke = item;
      return this.httpClient.get(item.location_area_encounters).toPromise();
    }).then(locations => {
      infoPoke.locations_areas = locations;
      return infoPoke;
    });
   }
}
