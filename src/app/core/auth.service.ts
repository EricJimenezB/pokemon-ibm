import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string;
  private user: User;

  constructor(private httpClient: HttpClient) {
    this.url = 'https://jsonplaceholder.typicode.com/users/';
    this.user =  {
      id: undefined,
      name: undefined,
      username: undefined,
      favoritesID: undefined,
      pokemon: undefined
    };
  }

  getUser(): User {
    if (sessionStorage.getItem('user') !== null){
      return JSON.parse(sessionStorage.getItem('user'));
    }
    return {
      id: undefined,
      name: undefined,
      username: undefined,
      favoritesID: undefined,
      pokemon: undefined
    };
  }

  login(id: number) {
    if (sessionStorage.getItem('user') !== null) {
      return true;
    }
    this.httpClient.get<any>(`${this.url}${id}`).toPromise().then(user => {
      console.log(user.id);
      this.user.id = user.id;
      this.user.name = user.name;
      this.user.username = user.username;
      this.user.favoritesID = 'pokemons' + user.id;
      this.user.pokemon = id == 1 ? 'dragonite' : 'suicune';
      sessionStorage.setItem('user', JSON.stringify(this.user));
      return true;
    }).catch(
      error => {
        return false;
      }
    );
  }

  logout() {
    sessionStorage.removeItem('user');
  }
}
