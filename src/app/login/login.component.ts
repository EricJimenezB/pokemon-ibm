import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id: number;
  constructor(private auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.id = params.id.split('-')[1];
      },
      error => {
        this.auth.logout();
        this.router.navigate(['errorAuth']);
      }
    );
    if (this.id){
      this.auth.login(this.id);
      if (this.auth.getUser()){
        this.router.navigate(['welcome']);
      }
      else {
        this.auth.logout();
        this.router.navigate(['errorAuth']);
      }
    }
    else {
      this.auth.logout();
      this.router.navigate(['errorAuth']);
    }
  }

}
