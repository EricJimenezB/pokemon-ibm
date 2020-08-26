import { Component, OnInit } from '@angular/core';
import { WelcomePokeService } from './welcome-poke.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  myPokemonData: any;
  username: string;
  myPokemon: string;
  constructor(private welcomePoke: WelcomePokeService, private auth: AuthService) {
    this.username = this.auth.getUser().username;
    this.myPokemon = this.auth.getUser().pokemon;
   }

  ngOnInit(): void {
    this.welcomePoke.getMyPokemon(this.myPokemon).then(item => {
      this.myPokemonData = item;
    }).catch(error => {
      console.log(error);
    });
  }

}
