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
    return this.httpClient.get(this.url + name).toPromise()
    .then(item => {
      console.log(item);
      return item;
    });
   }
}
