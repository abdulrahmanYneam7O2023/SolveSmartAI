import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProblemService, Problem, DifficultyLevel, SubmissionResult } from '../services/problem.service';
import { CodeEditorComponent } from '../components/code-editor/code-editor.component';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-problem-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, CodeEditorComponent],
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {
  problem: Problem | null = null;
  problemId: number = 0;
  code: string = '';
  selectedLanguage: string = 'javascript';
  isRunning: boolean = false;
  isSubmitting: boolean = false;
  isLoading: boolean = false;
  result: SubmissionResult | null = null;

  languages = [
    { value: '14', label: 'TypeScript' },

  ];

  constructor(
    private route: ActivatedRoute,
    private problemService: ProblemService,
    private snackBar: MatSnackBar,
    private ApiService: ApiService,
    private AuthService: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.problemId = +params.get('id')!;
      console.log('Problem ID:', this.problemId);
    })
    this.loadProblem();
  }

  loadProblem(): void {
    this.isLoading = true;
    this.problemService.getProblem(this.problemId).subscribe({
      next: (problem) => {
        this.problem = problem;
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage('Error loading problem: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  onLanguageChange(): void {
    // Reset code when language changes
    this.code = '';
    this.result = null;
  }

  runCode(): void {
    if (!this.code.trim()) {
      this.showMessage('Please write some code first');
      return;
    }

    this.isRunning = true;
    this.problemService.submitSolution(this.problemId, this.code, this.selectedLanguage).subscribe({
      next: (result) => {
        this.result = result;
        this.isRunning = false;
      },
      error: (error) => {
        this.showMessage('Error running code: ' + error.message);
        this.isRunning = false;
      }
    });
  }

  // submitSolution(): void {


  //   this.isSubmitting = true;

  //   this.ApiService.submitSolut(14 , this.code ,this.AuthService.userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ,this.problemId ).subscribe({
  //     next: (result) => {
  //       this.isSubmitting = false;
  //       this.showMessage('Solution submitted successfully');
  //     },
  //     error: (error) => {
  //       this.showMessage('Error submitting solution: ' + error.message);
  //       this.isSubmitting = false;
  //     }
  //   })

  // }

  submitSolution(): void {
    if (!this.problem?.id) {
      this.showMessage('Invalid problem ID');
      return;
    }

    if (!this.code.trim()) {
      this.showMessage('Please write some code first');
      return;
    }

    this.isSubmitting = true;
    this.result = null; // Reset result before submitting

    this.ApiService.submitSolut(
      14, // languageId for TypeScript
      this.code,
      this.AuthService.userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      this.problemId
    ).subscribe({
      next: (result: SubmissionResult) => {
        this.result = result; // Bind response to result for UI display
        this.isSubmitting = false;
        this.showMessage(result.success ? 'Solution submitted successfully' : 'Solution failed');
      },
      error: (error) => {
        this.showMessage('Error submitting solution: ' + (error.message || 'Unknown error'));
        this.isSubmitting = false;
      }
    });
  }

  getDifficultyLabel(level: DifficultyLevel): string {
    const labels = {
      [DifficultyLevel.Easy]: 'Easy',
      [DifficultyLevel.Medium]: 'Medium',
      [DifficultyLevel.Hard]: 'Hard',
      [DifficultyLevel.VeryHard]: 'Very Hard'
    };
    return labels[level] || 'Unknown';
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
