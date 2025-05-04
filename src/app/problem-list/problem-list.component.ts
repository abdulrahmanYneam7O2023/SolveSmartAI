import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { ProblemService } from '../services/problem.service';

@Component({
  selector: 'app-problem-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css'],
})
export class ProblemListComponent implements OnInit {
  searchTerm: string = '';
  selectedDifficulty: string = '';
  selectedTag: string = '';
  problems: any[] = [];
  filteredProblems: any[] = [];
  isLoading: boolean = true;

  constructor(private problemService: ProblemService, private router: Router) {}

  ngOnInit(): void {
    this.loadProblems();
  }

  loadProblems(): void {
    this.isLoading = true;
    this.problemService.getProblems().subscribe(
      (problems) => {
        this.problems = problems;
        this.filteredProblems = problems;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading problems:', error);
        this.isLoading = false;
      }
    );
  }

  onSearch() {
    console.log('Searching for:', this.searchTerm);
    this.filterProblems();
  }

  onDifficultyChange() {
    console.log('Difficulty changed to:', this.selectedDifficulty);
    this.filterProblems();
  }

  onTagChange() {
    console.log('Tag changed to:', this.selectedTag);
    this.filterProblems();
  }

  filterProblems() {
    this.filteredProblems = this.problems.filter((problem) => {
      const matchesSearch =
        !this.searchTerm ||
        problem.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        problem.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      const matchesDifficulty =
        !this.selectedDifficulty ||
        problem.difficultyLevel === this.selectedDifficulty;
      const matchesTag =
        !this.selectedTag || problem.tags.includes(this.selectedTag);

      return matchesSearch && matchesDifficulty && matchesTag;
    });
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Easy':
        return '#4CAF50';
      case 'Medium':
        return '#FFC107';
      case 'Hard':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  }

  navigateToProblem(id: number) {
    console.log('Navigating to problem with id:', id);
    this.router.navigate(['/problem-detail', id]);
  }

  openProblemForm() {
    console.log('Opening problem form...');
    // Logic can be added to open a new problem creation dialog
  }

  editProblem(problem: any) {
    console.log('Editing problem:', problem);
    // Logic can be added to edit the problem
  }

  deleteProblem(id: number) {
    console.log('Deleting problem with id:', id);
    // Logic can be added to delete the problem
  }
}
