import { Route } from '@angular/router';
import { Home } from './home/home';
import { loggedUserGuard } from '@viceversa-messaging-app/auth';
import { Login } from './login/login';

export const appRoutes: Route[] = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: Home, canActivate: [loggedUserGuard]},
    {path: 'login', component: Login}
];
