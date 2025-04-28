import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import {ChatComponent} from './chat/chat.component';
import { ChatsComponent } from './chats/chats.component';
import { ProblemsComponent } from './problems/problems.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { CodeEditorComponent } from './code-edito/code-edito.component';
import { ProblemDetailComponent } from './problem-detail/problem-detail.component';
import { NotFoundComponent } from './Errors/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  {path: 'chat', component: ChatComponent },
  {path: 'problem-detail/:id', component: ProblemDetailComponent },
  {path: 'problems', component: ProblemsComponent },
  {path: 'about-us', component: AboutusComponent },
  {path: 'code-editor', component: CodeEditorComponent },
  {path: 'problem-list', component: ProblemListComponent },
  {path: 'contact-us', component: ContactUsComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {path: 'chat', component: ChatComponent },
  {path: 'chats', component: ChatsComponent },
  { path: '**', component: NotFoundComponent }
];
