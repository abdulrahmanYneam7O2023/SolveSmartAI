import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 
  features = [
    {
      title: 'Multi-Language Challenges',
      description: 'Solve coding problems using C#, C++, Java, and more. Expand your language proficiency.',
      icon: 'bi-braces' // Icon representing code
    },
    {
      title: 'Language-Specific Editor',
      description: 'Utilize our online editor with syntax highlighting and support tailored for C#, C++, and Java.',
      icon: 'bi-code-slash' // Icon for code editor
    },
    {
      title: 'Targeted Practice',
      description: 'Focus your practice on specific languages like C#, C++, or Java to master their nuances.',
      icon: 'bi-bullseye' // Icon for targeting/focus
    }
  ];
  
}


