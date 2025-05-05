import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export enum DifficultyLevel {
  Easy = 1,
  Medium = 2,
  Hard = 3,
  VeryHard = 4
}

export interface Problem {
  problemId?: number;
  title: string;
  description: string;
  constraints?: string;
  difficultyLevel: DifficultyLevel;
  testCaseInput: string;
  testCaseOutput: string;
  best_Solution: string;
}

export interface SubmissionResult {
  success: boolean;
  output?: string;
  error?: string;
  executionTime?: number;
  memoryUsage?: number;
}

interface SubmissionRequest {
  languageId: number;
  code: string;
  userId: string;
  problemId: number;
}

@Injectable({
  providedIn: 'root',
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

  getAllProblems(): Observable<Problem[]> {
    return this.apiService.getProblems();
  }

  getProblemById(id: number): Observable<Problem> {
    return this.apiService.getProblem(id);
  }

  addProblem(problem: Problem): Observable<Problem> {
    const problemToSend = {
      ...problem,
      difficultyLevel: Number(problem.difficultyLevel),
      constraints: problem.constraints || ''
    };
    return this.apiService.addProblem(problemToSend);
  }

  updateProblem(id: number, problem: Problem): Observable<Problem> {
    const problemToSend = {
      ...problem,
      difficultyLevel: Number(problem.difficultyLevel),
      constraints: problem.constraints || ''
    };
    return this.apiService.updateProblem(id, problemToSend);
  }

  deleteProblem(id: number): Observable<void> {
    return this.apiService.deleteProblem(id);
  }

  submitSolution(problemId: number, code: string, language: string): Observable<SubmissionResult> {
    const userId = this.getUserId();
    const languageId = this.mapLanguageToId(language);
    const request: SubmissionRequest = { languageId, code, userId, problemId };
    return this.apiService.submitSolution(request);
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
