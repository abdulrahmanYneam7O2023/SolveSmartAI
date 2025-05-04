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
import { ProblemService } from '../services/problem.service';

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
  problem: any = null;
  selectedLanguage: string = 'javascript';
  code: string = '';
  isSubmitting: boolean = false;
  isLoading: boolean = true;
  isRunning: boolean = false;
  result: any = null;
  problemId: number = 0;

  languages = [
    { value: 'javascript', viewValue: 'JavaScript' },
    { value: 'typescript', viewValue: 'TypeScript' },
    { value: 'python', viewValue: 'Python' },
    { value: 'java', viewValue: 'Java' },
    { value: 'csharp', viewValue: 'C#' },
  ];

  constructor(
    private route: ActivatedRoute,
    private problemService: ProblemService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.problemId = +params['id']; // "+" converts string to number
      this.loadProblem();
    });
  }

  loadProblem(): void {
    this.isLoading = true;
    this.problemService.getProblem(this.problemId).subscribe(
      (problem) => {
        this.problem = problem;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading problem:', error);
        this.isLoading = false;
      }
    );
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

  onLanguageChange() {
    console.log('Language changed to:', this.selectedLanguage);
  }

  runCode() {
    this.isRunning = true;
    console.log('Running code:', this.code);

    this.problemService
      .submitSolution(this.problemId, this.code, this.selectedLanguage)
      .subscribe(
        (result) => {
          this.result = result;
          this.isRunning = false;
        },
        (error) => {
          console.error('Error running code:', error);
          this.isRunning = false;
        }
      );
  }

  submitSolution() {
    this.isSubmitting = true;
    console.log('Submitting solution:', this.code);

    this.problemService
      .submitSolution(this.problemId, this.code, this.selectedLanguage)
      .subscribe(
        (result) => {
          this.result = result;
          this.isSubmitting = false;
        },
        (error) => {
          console.error('Error submitting solution:', error);
          this.isSubmitting = false;
          this.result = {
            success: false,
            error: 'An error occurred while submitting your solution',
          };
        }
      );
  }
}
