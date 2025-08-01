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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
    MatSnackBarModule
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

  constructor(
    private problemService: ProblemService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadProblems();
  }

  loadProblems(): void {
    this.isLoading = true;
    this.problemService.getProblems().subscribe({
      next: (problems: Problem[]) => {
        this.problems = problems;
        this.filteredProblems = problems;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading problems:', error);
        this.isLoading = false;
        this.showError('Failed to load problems. Please try again later.');
      }
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onDifficultyChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredProblems = this.problems.filter(problem => {
      // Filter by search term
      const matchesSearch = !this.searchTerm ||
        problem.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        problem.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filter by difficulty
      const matchesDifficulty = !this.selectedDifficulty ||
        problem.difficultyLevel === this.selectedDifficulty;

      return matchesSearch && matchesDifficulty;
    });
  }

  getDifficultyLabel(level: DifficultyLevel): string {
    const difficulty = this.difficultyLevels.find(l => l.value === level);
    return difficulty ? difficulty.label : 'Unknown';
  }

  navigateToProblem(id: number): void {
    this.router.navigate(['/problem-detail', id]);
  }

  openProblemForm(): void {
    // TODO: Implement problem creation dialog
    console.log('Opening problem form...');
  }

  editProblem(problem: Problem): void {
    // TODO: Implement problem editing
    console.log('Editing problem:', problem);
  }

  deleteProblem(id: number): void {
    // TODO: Implement problem deletion
    console.log('Deleting problem with id:', id);
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
