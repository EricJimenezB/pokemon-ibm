import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';

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
    return this.httpClient.get<any>(`${this.url}${id}`);
  }

  logout() {
    sessionStorage.removeItem('user');
  }
}
