import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { User } from '../core/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id: number;
  name: string;
  user: User;
  constructor(private auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
  this.user =  {
    id: undefined,
    name: undefined,
    username: undefined,
    favoritesID: undefined,
    pokemon: undefined
  };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.name = params.id.split('-')[0];
      this.id = Number(params.id.split('-')[1]);
      },
      error => {
        this.auth.logout();
        this.router.navigate(['errorAuth']);
      }
    );
    if ((this.id === 1 && this.name === 'bret') || (this.id === 3 && this.name === 'samantha')){
      this.auth.login(this.id).subscribe(user => {
        this.user.id = user.id;
        this.user.name = user.name;
        this.user.username = user.username;
        this.user.favoritesID = 'pokemons' + user.id;
        this.user.pokemon = (this.id === 1 ? 'dragonite' : 'suicune');
        if (this.user.id){
          sessionStorage.setItem('user', JSON.stringify(this.user));
          this.router.navigate(['welcome']);
        }
        else{
          this.router.navigate(['errorAuth']);
        }
      });
    }
    else {
      this.auth.logout();
      this.router.navigate(['errorAuth']);
    }
  }

}
