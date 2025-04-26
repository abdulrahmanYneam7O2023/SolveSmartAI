import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [MatCardModule, CommonModule , MatIconModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {
  teamMembers = [
    {
      name: 'Hesham Mohamed',
      role: 'Frontend Developer',
      bio: 'Specialized in Angular and UI/UX design',
      image: 'assets/images/team1.jpg'
    },
    {
      name: 'Abdul Rahman Yahia Neam ',
      role: 'Backend Developer',
      bio: 'Expert in Node.js and database architecture',
      image: 'assets/images/team2.jpg'
    },
    {
      name: 'Heba Ahmed farouk',
      role: 'AI Specialist',
      bio: 'Focuses on machine learning algorithms',
      image: 'assets/images/team3.jpg'
    }
  ];
}
