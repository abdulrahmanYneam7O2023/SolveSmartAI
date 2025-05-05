// problem-management.component.ts - REPLACE COMPLETELY
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProblemService, Problem, DifficultyLevel } from '../../services/problem.service';

@Component({
  selector: 'app-problem-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './problem-management.component.html',
  styleUrls: ['./problem-management.component.css']
})
export class ProblemManagementComponent implements OnInit {
  problems: Problem[] = [];
  editMode = false;
  currentProblemId: number | null = null;
  addProblemForm: FormGroup;
  difficultyLevels = [
    { value: DifficultyLevel.Easy, label: 'Easy' },
    { value: DifficultyLevel.Medium, label: 'Medium' },
    { value: DifficultyLevel.Hard, label: 'Hard' },
    { value: DifficultyLevel.VeryHard, label: 'Very Hard' }
  ];

  availableTags = [
    'Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math',
    'Sorting', 'Greedy', 'Depth-First Search', 'Binary Search', 'Tree',
    'Breadth-First Search', 'Graph', 'Linked List', 'Recursion'
  ];

  constructor(
    private problemService: ProblemService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.addProblemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      difficultyLevel: [DifficultyLevel.Easy, Validators.required],
      testCaseInput: ['', Validators.required],
      testCaseOutput: ['', Validators.required],
      constraints: [''],
      best_Solution: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProblems();
  }

  loadProblems(): void {
    this.problemService.getAllProblems().subscribe({
      next: (problems) => {
        console.log('Loaded problems:', problems);
        this.problems = problems;
      },
      error: (error) => {
        console.error('Error loading problems:', error);
        this.showSnackBar('Error loading problems');
      }
    });
  }

  onSubmit(): void {
    if (this.addProblemForm.valid) {
      const problemData = this.addProblemForm.value;
      console.log('Submitting problem data:', problemData);

      if (this.editMode && this.currentProblemId) {
        this.problemService.updateProblem(this.currentProblemId, problemData).subscribe({
          next: (updatedProblem) => {
            console.log('Problem updated:', updatedProblem);
            this.showSnackBar('Problem updated successfully');
            this.resetForm();
            this.loadProblems();
          },
          error: (error) => {
            console.error('Error updating problem:', error);
            this.showSnackBar('Error updating problem');
          }
        });
      } else {
        this.problemService.addProblem(problemData).subscribe({
          next: (newProblem) => {
            console.log('Problem added:', newProblem);
            this.showSnackBar('Problem added successfully');
            this.resetForm();
            this.loadProblems();
          },
          error: (error) => {
            console.error('Error adding problem:', error);
            this.showSnackBar('Error adding problem');
          }
        });
      }
    }
  }

  editProblem(problem: Problem): void {
    this.editMode = true;
    this.currentProblemId = problem.problemId!;
    this.addProblemForm.patchValue({
      title: problem.title,
      description: problem.description,
      difficultyLevel: problem.difficultyLevel,
      testCaseInput: problem.testCaseInput,
      testCaseOutput: problem.testCaseOutput,
      constraints: problem.constraints || '',
      best_Solution: problem.best_Solution
    });
  }

  deleteProblem(id: number): void {
    if (confirm('Are you sure you want to delete this problem?')) {
      this.problemService.deleteProblem(id).subscribe({
        next: () => {
          this.showSnackBar('Problem deleted successfully');
          this.loadProblems();
        },
        error: (error) => {
          console.error('Error deleting problem:', error);
          this.showSnackBar('Error deleting problem');
        }
      });
    }
  }

  resetForm(): void {
    this.addProblemForm.reset({
      difficultyLevel: DifficultyLevel.Easy
    });
    this.editMode = false;
    this.currentProblemId = null;
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

  getDifficultyLabel(level: DifficultyLevel): string {
    const difficulty = this.difficultyLevels.find(l => l.value === level);
    return difficulty ? difficulty.label : 'Unknown';
  }

  addTag(tag: string): void {
    if (!tag) return;
    const currentTags = this.addProblemForm.get('tags')?.value || [];
    if (!currentTags.includes(tag)) {
      this.addProblemForm.patchValue({
        tags: [...currentTags, tag]
      });
    }
  }

  removeTag(tag: string): void {
    const currentTags = this.addProblemForm.get('tags')?.value || [];
    this.addProblemForm.patchValue({
      tags: currentTags.filter((t: string) => t !== tag)
    });
  }
}
