import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

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
export class AdminDashboardComponent implements OnInit {
  adminModules = [
    {
      title: 'Problem Management',
      description: 'Add, edit, delete and view programming problems',
      icon: 'code',
      route: '/admin/problems',
      color: 'primary',
      adminOnly: true,
    },
    {
      title: 'Language Management',
      description: 'Add, edit, delete and view programming languages',
      icon: 'language',
      route: '/admin/languages',
      color: 'accent',
      adminOnly: true,
    },
    {
      title: 'AI Problem Management',
      description: 'Generate, update, and delete problems using AI',
      icon: 'smart_toy',
      route: '/admin/ai-problems',
      color: 'warn',
      adminOnly: true,
    },
    {
      title: 'User Statistics',
      description: 'View user statistics and activities',
      icon: 'bar_chart',
      route: '/admin/statistics',
      color: 'accent',
      adminOnly: false,
    },
    
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
