import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { ProblemService, Problem, SubmissionResult, DifficultyLevel } from '../services/problem.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-problem-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    CodeEditorComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css'],
})
export class ProblemDetailComponent implements OnInit {
  problem: Problem | null = null;
  selectedLanguage: string = '';
  code: string = '';
  isSubmitting: boolean = false;
  isLoading: boolean = true;
  isRunning: boolean = false;
  result: SubmissionResult | null = null;
  problemId: number = 0;
  languages: { value: string; viewValue: string }[] = [];
  difficultyLevels = [
    { value: DifficultyLevel.Easy, label: 'Easy' },
    { value: DifficultyLevel.Medium, label: 'Medium' },
    { value: DifficultyLevel.Hard, label: 'Hard' },
    { value: DifficultyLevel.VeryHard, label: 'Very Hard' }
  ];

  constructor(
    private route: ActivatedRoute,
    private problemService: ProblemService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const problemId = this.route.snapshot.paramMap.get('id');
    if (problemId) {
      this.problemId = Number(problemId);
      this.loadProblem();
      this.loadLanguages();
    }
  }

  loadProblem(): void {
    this.isLoading = true;
    this.problemService.getProblemById(this.problemId).subscribe({
      next: (problem: Problem) => {
        this.problem = problem;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Error loading problem:', error);
        this.isLoading = false;
      },
    });
  }

  loadLanguages(): void {
    this.apiService.getLanguages().subscribe({
      next: (languages) => {
        this.languages = languages.map((lang: any) => ({
          value: lang.name.toLowerCase(),
          viewValue: lang.name,
        }));
        if (this.languages.length > 0) {
          this.selectedLanguage = this.languages[0].value;
        }
      },
      error: (error: unknown) => {
        console.error('Error loading languages:', error);
      },
    });
  }

  onLanguageChange(): void {
    console.log('Language changed to:', this.selectedLanguage);
  }

  runCode(): void {
    this.isRunning = true;
    this.problemService
      .submitSolution(this.problemId, this.code, this.selectedLanguage)
      .subscribe({
        next: (result: SubmissionResult) => {
          this.result = result;
          this.isRunning = false;
        },
        error: (error: unknown) => {
          console.error('Error running code:', error);
          this.isRunning = false;
          this.result = { success: false, error: 'An error occurred while running your code' };
        },
      });
  }

  submitSolution(): void {
    this.isSubmitting = true;
    this.problemService
      .submitSolution(this.problemId, this.code, this.selectedLanguage)
      .subscribe({
        next: (result: SubmissionResult) => {
          this.result = result;
          this.isSubmitting = false;
        },
        error: (error: unknown) => {
          console.error('Error submitting solution:', error);
          this.isSubmitting = false;
          this.result = { success: false, error: 'An error occurred while submitting your solution' };
        },
      });
  }

  getDifficultyLabel(level: DifficultyLevel): string {
    const difficulty = this.difficultyLevels.find(l => l.value === level);
    return difficulty ? difficulty.label : 'Unknown';
  }
}
