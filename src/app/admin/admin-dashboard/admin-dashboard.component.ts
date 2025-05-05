import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  adminModules = [
    {
      title: 'Problem Management',
      description: 'Add, edit, delete and view programming problems',
      icon: 'code',
      route: '/admin/problems',
      color: 'primary',
    },
    {
      title: 'Language Management',
      description: 'Add, edit, delete and view programming languages',
      icon: 'language',
      route: '/admin/languages',
      color: 'accent',
    },
    {
      title: 'User Statistics',
      description: 'View user statistics and activities',
      icon: 'bar_chart',
      route: '/admin/statistics',
      color: 'accent',
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: 'people',
      route: '/admin/users',
      color: 'warn',
    },
  ];
}