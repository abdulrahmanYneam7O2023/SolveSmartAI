// api.service.ts - REPLACE COMPLETELY
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Problem, DifficultyLevel } from './problem.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:7212/api';

  constructor(private http: HttpClient) { }

  // Email methods
  sendEmail(emailData: { userEmail: string; subject: string; message: string }): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/Email/SendEmail`, emailData)
      .pipe(
        tap(response => console.log('Email sent:', response)),
        catchError(this.handleError<any>('sendEmail'))
      );
  }

  // Language methods
  addLanguage(language: { languagesId: number; name: string }): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/Languages/addLanguage`, language)
      .pipe(
        tap(response => console.log('Language added:', response)),
        catchError(this.handleError<any>('addLanguage'))
      );
  }

  getLanguages(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/Languages/getLanguages`)
      .pipe(
        tap(languages => console.log('Languages fetched:', languages)),
        catchError(this.handleError<any[]>('getLanguages', []))
      );
  }

  getLanguage(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/Languages/getLanguage/${id}`)
      .pipe(
        tap(language => console.log(`Language ${id} fetched:`, language)),
        catchError(this.handleError<any>(`getLanguage id=${id}`))
      );
  }

  updateLanguage(id: number, language: { languagesId: number; name: string }): Observable<any> {
    return this.http
      .put<any>(`${this.baseUrl}/Languages/updateLanguage/${id}`, language)
      .pipe(
        tap(response => console.log(`Language ${id} updated:`, response)),
        catchError(this.handleError<any>(`updateLanguage id=${id}`))
      );
  }

  deleteLanguage(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/Languages/deleteLanguage/${id}`)
      .pipe(
        tap(_ => console.log(`Language ${id} deleted`)),
        catchError(this.handleError<any>(`deleteLanguage id=${id}`))
      );
  }

  // Problem methods
  addProblem(problem: {
    title: string;
    description: string;
    constraints: string;
    difficultyLevel: number;
    testCaseInput: string;
    testCaseOutput: string;
    best_Solution: string;
  }): Observable<Problem> {
    console.log('Adding problem:', problem);
    return this.http.post<Problem>(`${this.baseUrl}/Problem/addProblem`, problem).pipe(
      tap(response => console.log('Problem added successfully:', response)),
      catchError(error => this.handleError<Problem>('addProblem')(error))
    );
  }

  getProblems(): Observable<Problem[]> {
    return this.http.get<Problem[]>(`${this.baseUrl}/Problem/getProblems`).pipe(
      tap(problems => console.log('Problems fetched:', problems)),
      catchError(error => this.handleError<Problem[]>('getProblems', [])(error))
    );
  }

  getProblem(id: number): Observable<Problem> {
    return this.http.get<Problem>(`${this.baseUrl}/Problem/getProblem/${id}`).pipe(
      tap(problem => console.log('Problem fetched:', problem)),
      catchError(error => this.handleError<Problem>(`getProblem id=${id}`)(error))
    );
  }

  updateProblem(id: number, problem: {
    title: string;
    description: string;
    constraints: string;
    difficultyLevel: number;
    testCaseInput: string;
    testCaseOutput: string;
    best_Solution: string;
  }): Observable<Problem> {
    if (!id) {
      return throwError(() => new Error('Problem ID is required for update'));
    }
    console.log('Updating problem:', { id, problem });
    return this.http.put<Problem>(`${this.baseUrl}/Problem/updateProblem/${id}`, problem).pipe(
      tap(response => console.log('Problem updated successfully:', response)),
      catchError(error => this.handleError<Problem>(`updateProblem id=${id}`)(error))
    );
  }

  deleteProblem(id: number): Observable<void> {
    if (!id) {
      return throwError(() => new Error('Problem ID is required for deletion'));
    }
    return this.http.delete<void>(`${this.baseUrl}/Problem/deleteProblem/${id}`).pipe(
      tap(() => console.log('Problem deleted successfully')),
      catchError(error => this.handleError<void>(`deleteProblem id=${id}`)(error))
    );
  }

  // Submission methods
  submitSolution(submission: { languageId: number; code: string; userId: string; problemId: number }): Observable<any> {
    console.log('Submitting solution:', submission);
    return this.http
      .post<any>(`${this.baseUrl}/Submission/SubmitCode`, submission)
      .pipe(
        tap(response => console.log('Solution submitted:', response)),
        catchError(this.handleError<any>('submitSolution'))
      );
  }

  // Chat methods
  sendChatMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getApiKey()}`,
    });
    return this.http
      .post<any>(`${this.baseUrl}/chat`, { message }, { headers })
      .pipe(
        tap(response => console.log('Chat message sent:', response)),
        catchError(this.handleError<any>('sendChatMessage'))
      );
  }

  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed:`, error);

      // Log detailed error information
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        console.error('Client error:', error.error.message);
      } else {
        // Server-side error
        console.error(`Server error: ${error.status}`);
        console.error('Error body:', error.error);
      }

      // Return a user-friendly error message
      const errorMessage = error.error?.message || error.message || 'An error occurred';
      console.error('Error message:', errorMessage);

      return throwError(() => new Error(errorMessage));
    };
  }

  private getApiKey(): string {
    return environment.apiKey || '';
  }
}
