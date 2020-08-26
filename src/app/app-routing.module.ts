import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardGuard } from './core/guards/auth-guard.guard';
import { ErrorAuthComponent } from './public/error-auth/error-auth.component';


const routes: Routes = [
  {
    path: 'login/:id',
    component: LoginComponent
  },
  {
    path: 'errorAuth',
    component: ErrorAuthComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'pokemon',
    loadChildren: () => import('./features/features.module').then(mod => mod.FeaturesModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: '**',
    redirectTo: 'welcome',
    canActivate: [AuthGuardGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
