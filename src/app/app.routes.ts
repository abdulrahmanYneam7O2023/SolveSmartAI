import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './Errors/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  {path: 'chat', component: ChatComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: NotFoundComponent }
];
