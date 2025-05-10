import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProblemAIService, ProblemDescription } from '../../services/problem-ai.service';
import { Problem } from '../../services/problem.service';
import { DifficultyLabelPipe } from '../../pipes/difficulty-label.pipe';

@Component({
  selector: 'app-problem-ai-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSnackBarModule, DifficultyLabelPipe],
  templateUrl: './problem-ai-management.component.html',
  styleUrls: ['./problem-ai-management.component.css']
})
export class ProblemAiManagementComponent implements OnInit {
  problems: Problem[] = [];
  generateForm: FormGroup;
  updateForm: FormGroup;
  selectedProblemId: number | null = null;

  constructor(
    private problemAiService: ProblemAIService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.generateForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.updateForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadProblems();
  }

  loadProblems(): void {
    this.problemAiService.getProblems().subscribe({
      next: (problems: Problem[]) => {
        this.problems = problems;
      },
      error: (error: any) => {
        console.error('Error loading problems:', error);
        this.showSnackBar('Failed to load problems');
      }
    });
  }

  generateProblem(): void {
    if (this.generateForm.invalid) {
      this.showSnackBar('Please provide a valid description');
      return;
    }

    const descriptionData: ProblemDescription = this.generateForm.value;
    this.problemAiService.generateProblem(descriptionData).subscribe({
      next: (response: any) => {
        this.showSnackBar(response.message);
        this.generateForm.reset();
        this.loadProblems();
      },
      error: (error: any) => {
        console.error('Error generating problem:', error);
        this.showSnackBar(error.message || 'Failed to generate problem');
      }
    });
  }

  selectProblemForUpdate(id: number): void {
    this.selectedProblemId = id;
    this.updateForm.reset();
  }
updateProblem(): void {
    if (this.updateForm.invalid || !this.selectedProblemId) {
      this.showSnackBar('Please provide a valid description and select a problem');
      return;
    }

    const descriptionData: ProblemDescription = this.updateForm.value; // تعديل هنا
    this.problemAiService.updateProblemWithAI(this.selectedProblemId, descriptionData).subscribe({
      next: (response: any) => {
        this.showSnackBar(response.message);
        this.selectedProblemId = null;
        this.updateForm.reset();
        this.loadProblems();
      },
      error: (error: any) => {
        console.error('Error updating problem:', error);
        this.showSnackBar(error.message || 'Failed to update problem');
      }
    });
  }

  deleteProblem(id: number): void {
    if (confirm('Are you sure you want to delete this problem?')) {
      this.problemAiService.deleteProblemWithAI(id).subscribe({
        next: (response: any) => {
          this.showSnackBar(response.message);
          this.loadProblems();
        },
        error: (error: any) => {
          console.error('Error deleting problem:', error);
          this.showSnackBar(error.message || 'Failed to delete problem');
        }
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}