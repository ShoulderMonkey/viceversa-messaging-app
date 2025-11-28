import { Route } from '@angular/router';
import { Home } from './home/home';
import { loggedUserGuard } from '@viceversa-messaging-app/auth';
import { Login } from './login/login';
import { Chat } from './home/chat/chat';
import { ChatResolverService } from './home/chat/chat.resolver';
import { UserResolverService } from './home/chat/user.resolver';

export const appRoutes: Route[] = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home, canActivate: [loggedUserGuard] },
    { path: 'chat/:userId', component: Chat, resolve: {messages: ChatResolverService, user: UserResolverService},canActivate: [loggedUserGuard] },
    { path: 'login', component: Login }
];
