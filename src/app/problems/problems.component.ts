import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

enum DifficultyLevel {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}
@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [ CommonModule, MatCardModule, ReactiveFormsModule , MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.css'
})
export class ProblemsComponent implements OnInit {
  problemForm: FormGroup;
  difficultyLevels = Object.values(DifficultyLevel);
  isEditMode = false;

  constructor(private fb: FormBuilder) {
    this.problemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      constraints: ['', Validators.maxLength(500)],
      difficultyLevel: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.problemForm.valid) {
      console.log('Problem Data:', this.problemForm.value);
    }
  }
}
