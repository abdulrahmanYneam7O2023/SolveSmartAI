import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProblemService } from '../../services/problem.service';

@Component({
  selector: 'app-problem-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './problem-management.component.html',
  styleUrls: ['./problem-management.component.css']
})
export class ProblemManagementComponent implements OnInit {
  problems: any[] = [];
  displayedColumns: string[] = ['id', 'title', 'difficultyLevel', 'actions'];
  newProblem: any = this.getEmptyProblem();
  editMode: boolean = false;
  currentProblemId: number | null = null;

  difficultyLevels = ['Easy', 'Medium', 'Hard'];
  availableTags = [
    'Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math',
    'Sorting', 'Greedy', 'Depth-First Search', 'Binary Search', 'Tree',
    'Breadth-First Search', 'Graph', 'Linked List', 'Recursion'
  ];

  constructor(
    private problemService: ProblemService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProblems();
  }

  loadProblems(): void {
    this.problemService.getProblems().subscribe(
      (problems) => {
        this.problems = problems;
      },
      (error) => {
        console.error('Error loading problems:', error);
        this.showSnackBar('Failed to load problems');
      }
    );
  }

  getEmptyProblem(): any {
    return {
      title: '',
      description: '',
      difficultyLevel: 'Easy',
      tags: [],
      sampleInput: '',
      sampleOutput: '',
      constraints: ''
    };
  }

  onSubmit(): void {
    if (this.editMode) {
      this.updateProblem();
    } else {
      this.addProblem();
    }
  }

  addProblem(): void {
    this.problemService.addProblem(this.newProblem).subscribe(
      (response) => {
        this.problems.push(response);
        this.showSnackBar('Problem added successfully');
        this.resetForm();
      },
      (error) => {
        console.error('Error adding problem:', error);
        this.showSnackBar('Failed to add problem');
      }
    );
  }

  updateProblem(): void {
    if (this.currentProblemId === null) return;
    
    this.problemService.updateProblem(this.currentProblemId, this.newProblem).subscribe(
      (response) => {
        const index = this.problems.findIndex(p => p.id === this.currentProblemId);
        if (index !== -1) {
          this.problems[index] = response;
        }
        this.showSnackBar('Problem updated successfully');
        this.resetForm();
      },
      (error) => {
        console.error('Error updating problem:', error);
        this.showSnackBar('Failed to update problem');
      }
    );
  }

  editProblem(problem: any): void {
    this.editMode = true;
    this.currentProblemId = problem.id;
    this.newProblem = { ...problem };
  }

  deleteProblem(id: number): void {
    if (confirm('Are you sure you want to delete this problem?')) {
      this.problemService.deleteProblem(id).subscribe(
        (response) => {
          this.problems = this.problems.filter(p => p.id !== id);
          this.showSnackBar('Problem deleted successfully');
        },
        (error) => {
          console.error('Error deleting problem:', error);
          this.showSnackBar('Failed to delete problem');
        }
      );
    }
  }

  resetForm(): void {
    this.newProblem = this.getEmptyProblem();
    this.editMode = false;
    this.currentProblemId = null;
  }

  addTag(tag: string): void {
    if (!this.newProblem.tags.includes(tag)) {
      this.newProblem.tags.push(tag);
    }
  }

  removeTag(tag: string): void {
    this.newProblem.tags = this.newProblem.tags.filter((t: string) => t !== tag);
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}