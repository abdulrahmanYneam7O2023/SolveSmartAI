import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ProblemsComponent } from './problems/problems.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { ProblemDetailComponent } from './problem-detail/problem-detail.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ProblemManagementComponent } from './admin/problem-management/problem-management.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'problem-detail/:id', component: ProblemDetailComponent },
  { path: 'problems', component: ProblemsComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'code-editor', component: CodeEditorComponent },
  { path: 'problem-list', component: ProblemListComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'problems', component: ProblemManagementComponent },
    ]
  },
  { path: '**', component: NotFoundComponent },
];
