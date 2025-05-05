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
import { Router, RouterModule } from '@angular/router';
import { ProblemService, Problem, DifficultyLevel } from '../services/problem.service';

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
    RouterModule,
  ],
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css'],
})
export class ProblemListComponent implements OnInit {
  searchTerm: string = '';
  selectedDifficulty: DifficultyLevel | '' = '';
  difficultyLevels = [
    { value: DifficultyLevel.Easy, label: 'Easy' },
    { value: DifficultyLevel.Medium, label: 'Medium' },
    { value: DifficultyLevel.Hard, label: 'Hard' },
    { value: DifficultyLevel.VeryHard, label: 'Very Hard' }
  ];
  problems: Problem[] = [];
  filteredProblems: Problem[] = [];
  isLoading: boolean = true;

  constructor(private problemService: ProblemService, private router: Router) { }

  ngOnInit(): void {
    this.loadProblems();
  }

  loadProblems(): void {
    this.isLoading = true;
    this.problemService.getAllProblems().subscribe({
      next: (problems: Problem[]) => {
        this.problems = problems;
        this.filteredProblems = problems;
        this.isLoading = false;
        this.applyFilters();
      },
      error: (error: unknown) => {
        console.error('Error loading problems:', error);
        this.isLoading = false;
      },
    });
  }

  onSearch(): void {
    console.log('Searching for:', this.searchTerm);
    this.filterProblems();
  }

  onDifficultyChange(): void {
    console.log('Difficulty changed to:', this.selectedDifficulty);
    this.filterProblems();
  }

  filterProblems(): void {
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

      return matchesSearch && matchesDifficulty;
    });
  }

  applyFilters(): void {
    this.filteredProblems = this.problems.filter(problem => {
      if (this.selectedDifficulty && problem.difficultyLevel !== this.selectedDifficulty) {
        return false;
      }
      return true;
    });
  }

  getDifficultyLabel(level: DifficultyLevel): string {
    const difficulty = this.difficultyLevels.find(l => l.value === level);
    return difficulty ? difficulty.label : 'Unknown';
  }

  navigateToProblem(id: number): void {
    console.log('Navigating to problem with id:', id);
    this.router.navigate(['/problem-detail', id]);
  }

  openProblemForm(): void {
    console.log('Opening problem form...');
    // Logic can be added to open a new problem creation dialog
  }

  editProblem(problem: Problem): void {
    console.log('Editing problem:', problem);
    // Logic can be added to edit the problem
  }

  deleteProblem(id: number): void {
    console.log('Deleting problem with id:', id);
    // Logic can be added to delete the problem
  }
}
