// problem-management.component.ts - REPLACE COMPLETELY
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { Problem, DifficultyLevel } from '../../services/problem.service';

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
  problemId!:string;
  difficultyLevels = [
    { value: DifficultyLevel.Easy, label: 'Easy' },
    { value: DifficultyLevel.Medium, label: 'Medium' },
    { value: DifficultyLevel.Hard, label: 'Hard' },
    { value: DifficultyLevel.VeryHard, label: 'Very Hard' }
  ];

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.addProblemForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(30)]],
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
    this.apiService.getProblems().subscribe({
      next: (problems) => {
        this.problems = problems;
      },
      error: (error) => {
        console.error('Error loading problems:', error);
        this.showSnackBar('Failed to load problems');
      }
    });
  }

  onSubmit(): void {
    if (this.addProblemForm.invalid) {
      this.showSnackBar('Please fill in the required fields');
      return;
    }

    const problemData = this.addProblemForm.value;

   
      this.apiService.addProblem(problemData).subscribe({
        next: (newProblem) => {
          this.problems = [...this.problems, newProblem];
          this.showSnackBar('Problem added successfully');
          this.resetForm();
        },
        error: (error) => {
          console.error('Error adding problem:', error);
          this.showSnackBar('Failed to add problem');
        }
      });
    
  }

  updateProblem(){
    this.apiService.updateProblem(this.problemId, this.addProblemForm.value).subscribe({
      next: (response) => {
        console.log(response)
        this.editMode = false;
        this.addProblemForm.reset()
        this.loadProblems();
      },
      error: (error) => {
        console.log('Error updating problem:', error);
      }
    })
  }

  editProblem(problem: Problem , index : number): void {
    this.editMode = true;
  
    this.addProblemForm.patchValue({
      title: problem.title,
      description: problem.description,
      difficultyLevel: problem.difficultyLevel,
      testCaseInput: problem.testCaseInput,
      testCaseOutput: problem.testCaseOutput,
      constraints: problem.constraints,
      best_Solution: problem.best_Solution
    });
   
    
    this.problemId = this.problems[index].id.toString();
  }

  deleteProblem(problem: Problem): void {
    if (!problem.id) {
      this.showSnackBar('Invalid problem ID');
      return;
    }

    if (confirm('Are you sure you want to delete this problem?')) {
      this.apiService.deleteProblem(problem.id).subscribe({
        next: () => {
          this.problems = this.problems.filter((p) => p.id !== problem.id);
          this.showSnackBar('Problem deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting problem:', error);
          this.showSnackBar('Failed to delete problem');
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

  getDifficultyLabel(level: DifficultyLevel): string {
    return this.difficultyLevels.find(d => d.value === level)?.label || 'Unknown';
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}