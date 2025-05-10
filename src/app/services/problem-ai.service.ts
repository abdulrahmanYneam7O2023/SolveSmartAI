import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

// تعريف الـ interfaces
export interface Problem {
  id: number;
  title: string;
  description: string;
  difficultyLevel: number; // هيتماشى مع DifficultyLevel enum
  testCaseInput: string;
  testCaseOutput: string;
  constraints: string;
  best_Solution: string;
}

export interface ProblemDescription {
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProblemAIService {
  constructor(private apiService: ApiService) {}

  // Generate a new problem
  generateProblem(description: ProblemDescription): Observable<any> {
    return this.apiService.generateProblem(description);
  }

  // Update an existing problem
  updateProblemWithAI(id: number, description: ProblemDescription): Observable<any> {
    return this.apiService.updateProblemWithAI(id, description);
  }

  // Delete a problem
  deleteProblemWithAI(id: number): Observable<any> {
    return this.apiService.deleteProblemWithAI(id);
  }

  // Get all problems
  getProblems(): Observable<Problem[]> {
    return this.apiService.getProblems();
  }

  // Get a single problem by ID
  getProblem(id: number): Observable<Problem> {
    return this.apiService.getProblem(id);
  }
}