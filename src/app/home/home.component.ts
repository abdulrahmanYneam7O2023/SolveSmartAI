import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  features = [
    {
      title: 'Multi-Language Challenges',
      description: 'Solve coding problems using JavaScript, Python, Java, and more. Expand your language proficiency.',
      icon: 'bi-braces'
    },
    {
      title: 'Interactive Code Editor',
      description: 'Utilize our online editor with syntax highlighting and intelligent code completion.',
      icon: 'bi-code-slash'
    },
    {
      title: 'Targeted Practice',
      description: 'Focus your practice on specific algorithms and data structures to master technical interviews.',
      icon: 'bi-bullseye'
    }
  ];
  
  popularProblems = [
    {
      id: 1,
      title: 'Two Sum',
      description: 'Find two numbers in an array that add up to a specific target.',
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: 'Reverse Linked List',
      description: 'Reverse a singly linked list in-place with O(1) extra memory.',
      difficulty: 'Medium'
    },
    {
      id: 3,
      title: 'Merge K Sorted Lists',
      description: 'Merge k sorted linked lists into one sorted linked list.',
      difficulty: 'Hard'
    }
  ];
  
  constructor() {}
  
  ngOnInit(): void {
    // Initialize component data
  }
}


