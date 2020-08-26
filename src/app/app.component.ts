import { Component } from '@angular/core';
import { FavoritesService } from './features/favorites.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numFavorites: number;
  constructor(private favoritesService: FavoritesService){
    favoritesService.changeNumberFavorites.subscribe(item => {
      this.numFavorites = item;
    });
  }
}
