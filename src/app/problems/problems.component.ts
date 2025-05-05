import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProblemService, Problem } from '../services/problem.service';

enum DifficultyLevel {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
  ],
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css'],
})
export class ProblemsComponent implements OnInit {
  problemForm: FormGroup;
  difficultyLevels = Object.values(DifficultyLevel);
  isEditMode = false;
  availableTags = [
    'Array',
    'String',
    'Hash Table',
    'Dynamic Programming',
    'Math',
    'Sorting',
    'Greedy',
    'Depth-First Search',
    'Binary Search',
    'Tree',
    'Breadth-First Search',
    'Graph',
    'Linked List',
    'Recursion',
  ];

  constructor(
    private fb: FormBuilder,
    private problemService: ProblemService,
    private snackBar: MatSnackBar
  ) {
    this.problemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      constraints: ['', Validators.maxLength(500)],
      difficultyLevel: ['', Validators.required],
      tags: [[]],
      testCaseInput: ['', Validators.required],
      testCaseOutput: ['', Validators.required],
      best_Solution: [''],
      problemId: [0],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.problemForm.invalid) {
      this.showSnackBar('Please fill all required fields');
      return;
    }
    const problem: Problem = this.problemForm.value;
    if (this.isEditMode) {
      this.updateProblem(problem);
    } else {
      this.addProblem(problem);
    }
  }

  addProblem(problem: Problem): void {
    this.problemService.addProblem(problem).subscribe({
      next: (response: Problem) => {
        this.showSnackBar('Problem added successfully');
        this.resetForm();
      },
      error: (error: unknown) => {
        console.error('Error adding problem:', error);
        this.showSnackBar('Failed to add problem');
      },
    });
  }

  updateProblem(problem: Problem): void {
    const problemId = this.problemForm.get('problemId')?.value;
    if (!problemId) return;
    this.problemService.updateProblem(problemId, problem).subscribe({
      next: (response: Problem) => {
        this.showSnackBar('Problem updated successfully');
        this.resetForm();
      },
      error: (error: unknown) => {
        console.error('Error updating problem:', error);
        this.showSnackBar('Failed to update problem');
      },
    });
  }

  resetForm(): void {
    this.problemForm.reset({
      title: '',
      description: '',
      constraints: '',
      difficultyLevel: '',
      tags: [],
      testCaseInput: '',
      testCaseOutput: '',
      best_Solution: '',
      problemId: 0,
    });
    this.isEditMode = false;
  }

  addTag(tag: string): void {
    const tags = this.problemForm.get('tags')?.value || [];
    if (tag && !tags.includes(tag)) {
      this.problemForm.get('tags')?.setValue([...tags, tag]);
    }
  }

  removeTag(tag: string): void {
    const tags = this.problemForm.get('tags')?.value || [];
    this.problemForm.get('tags')?.setValue(tags.filter((t: string) => t !== tag));
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}
