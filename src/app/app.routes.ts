import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/auth/auth.component').then((c) => c.AuthComponent),
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      {
        path: 'signin',
        loadComponent: () => import('./auth/signin/signin.component').then((c) => c.SigninComponent),
      },
      {
        path: 'signup',
        loadComponent: () => import('./auth/signup/signup.component').then((c) => c.SignupComponent),
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./core/blank/blank.component').then((c) => c.BlankComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'aboutus',
        loadComponent: () => import('./aboutus/aboutus.component').then((c) => c.AboutusComponent),
      },
      {
        path: 'chatbot',
        loadComponent: () => import('./chatbot/chatbot.component').then((c) => c.ChatbotComponent),
      },
      {
        path: 'problems',
        loadComponent: () => import('./problems/problems.component').then((c) => c.ProblemsComponent),
      },
      {
        path: 'contactus',
        loadComponent: () => import('./contact-us/contact-us.component').then((c) => c.ContactUsComponent),
      },
      {
        path: 'problem-list',
        loadComponent: () => import('./problem-list/problem-list.component').then((c) => c.ProblemListComponent),
      },
      {
        path: 'code-editor',
        loadComponent: () => import('./code-editor/code-editor.component').then((c) => c.CodeEditorComponent),
      },
      {
        path: 'problem-detail/:id',
        loadComponent: () =>
          import('./problem-detail/problem-detail.component').then((c) => c.ProblemDetailComponent),
      },
      {
        path: 'adminDashboard',

        loadComponent: () =>
          import('./admin/admin-dashboard/admin-dashboard.component').then(
            (c) => c.AdminDashboardComponent
          ),
      },
      {
        path: 'admin',

        children: [
          {
            path: 'problems',
            loadComponent: () =>
              import('./admin/problem-management/problem-management.component').then(
                (c) => c.ProblemManagementComponent
              ),
          },
          {
            path: 'languages',
            loadComponent: () =>
              import('./admin/language-management/language-management.component').then(
                (c) => c.LanguageManagementComponent
              ),
          },
        ],
      },
    ],
  },
];
