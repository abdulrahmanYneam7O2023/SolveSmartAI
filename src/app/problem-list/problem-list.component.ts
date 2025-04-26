import { Component } from '@angular/core';
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

@Component({
  selector: 'app-problem-list',
  standalone: true,
  imports: [  CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule],
  templateUrl: './problem-list.component.html',
  styleUrl: './problem-list.component.css'
})
export class ProblemListComponent {
  searchTerm: string = '';
  selectedDifficulty: string = '';
  selectedTag: string = '';
  problems: any[] = []; // مؤقتاً مصفوفة فاضية لغاية ما تجيب البيانات
  filteredProblems: any[] = [];

  constructor() {
    // Initialize filteredProblems with all problems
    this.filteredProblems = this.problems;
  }

  onSearch() {
    // Implement search logic here
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
    this.filteredProblems = this.problems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          problem.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDifficulty = !this.selectedDifficulty || problem.difficultyLevel === this.selectedDifficulty;
      const matchesTag = !this.selectedTag || problem.tags.includes(this.selectedTag);

      return matchesSearch && matchesDifficulty && matchesTag;
    });
  }

  getDifficultyColor(difficulty: string): string {
    switch(difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FFC107';
      case 'Hard': return '#F44336';
      default: return '#9E9E9E';
    }
  }

  navigateToProblem(id: number) {
    console.log('Navigating to problem with id:', id);
    // Implement navigation logic here
  }

  openProblemForm() {
    console.log('Opening problem form...');
  }

  editProblem(problem: any) {
    console.log('Editing problem:', problem);
  }

  deleteProblem(id: number) {
    console.log('Deleting problem with id:', id);
  }
}
