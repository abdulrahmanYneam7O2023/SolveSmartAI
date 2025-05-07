import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

export enum DifficultyLevel {
  Easy = 0,
  Medium = 1,
  Hard = 2,
  VeryHard = 3
}

export interface Problem {
  id: number;
  title: string;
  description: string;
  difficultyLevel: DifficultyLevel;
  testCaseInput: string;
  testCaseOutput: string;
  constraints: string;
  best_Solution: string;
}

interface SubmissionRequest {
  languageId: number;
  code: string;
  userId: string;
  problemId: number;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  submissionId?: number;
  aiEvaluation: {
    isCorrect: boolean;
    successRate: number;
    feedback: string;
    correctSolution: string;
}
// export interface SubmissionResult {
//   success: boolean;
//   message: string;
//   testResults?: {
//     input: string;
//     expected: string;
//     actual: string;
//     passed: boolean;
//   }[];
//   executionTime?: number;
//   memoryUsage?: number;
// }


}
@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private languageMap: { [key: string]: number } = {
    javascript: 1,
    typescript: 2,
    python: 3,
    java: 4,
    csharp: 5,
  };

  constructor(private apiService: ApiService) { }

  getProblems(): Observable<Problem[]> {
    return this.apiService.getProblems();
  }

  getProblem(id: number): Observable<Problem> {
    return this.apiService.getProblem(id);
  }

  addProblem(problem: Problem): Observable<Problem> {
    return this.apiService.addProblem(problem);
  }

  updateProblem(id: string, problem: Problem): Observable<Problem> {
    return this.apiService.updateProblem(id, problem);
  }

  deleteProblem(id: number): Observable<void> {
    return this.apiService.deleteProblem(id);
  }

  submitSolution(problemId: number, code: string, language: string): Observable<SubmissionResult> {
    const submission: SubmissionRequest = {
      problemId,
      code,
      languageId: this.mapLanguageToId(language),
      userId: this.getUserId()
    };
    return this.apiService.submitSolution(submission);
  }

  private getUserId(): string {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.warn('User ID not found in localStorage. Using default value.');
      return 'default-user-id';
    }
    return userId;
  }

  private mapLanguageToId(language: string): number {
    const langId = this.languageMap[language.toLowerCase()];
    if (!langId) {
      console.warn(`Language "${language}" not found in language map. Defaulting to ID 1.`);
      return 1;
    }
    return langId;
  }
}
