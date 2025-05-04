import { Component,  Input,  OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'SolveSmart';
  isMobileMenuOpen = false;
  isLoggedIn = false;
  isAdmin = false;
 @Input({required : true}) islogged!:boolean

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

  }

  logout(): void {
    this.authService.logout();
  }
}
