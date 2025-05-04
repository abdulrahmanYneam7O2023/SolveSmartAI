import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Examples of API service functions

  // Fetch list of problems
  getProblems(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/problems`)
      .pipe(catchError(this.handleError<any[]>('getProblems', [])));
  }

  // Fetch a specific problem by ID
  getProblem(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/problems/${id}`)
      .pipe(catchError(this.handleError<any>(`getProblem id=${id}`)));
  }

  // Add a new problem
  addProblem(problem: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/problems`, problem)
      .pipe(catchError(this.handleError<any>('addProblem')));
  }

  // Update an existing problem
  updateProblem(id: number, problem: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/problems/${id}`, problem)
      .pipe(catchError(this.handleError<any>(`updateProblem id=${id}`)));
  }

  // Delete a problem
  deleteProblem(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/problems/${id}`)
      .pipe(catchError(this.handleError<any>(`deleteProblem id=${id}`)));
  }

  // Submit a solution for a problem
  submitSolution(
    problemId: number,
    code: string,
    language: string
  ): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/solutions`, { problemId, code, language })
      .pipe(catchError(this.handleError<any>('submitSolution')));
  }

  // Send a message to the chatbot
  sendChatMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getApiKey()}`,
    });

    return this.http
      .post<any>(`${this.apiUrl}/chat`, { message }, { headers })
      .pipe(catchError(this.handleError<any>('sendChatMessage')));
  }

  // Handle errors uniformly
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // You can log the error or send it to an error tracking service

      // Return a default or empty result to continue application execution
      return of(result as T);
    };
  }

  // Get API key securely
  private getApiKey(): string {
    // In production, this should come from a secure storage or credentials service
    return environment.apiKey || '';
  }
}
