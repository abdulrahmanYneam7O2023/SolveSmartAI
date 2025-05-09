// api.service.ts - REPLACE COMPLETELY
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SubmissionResult ,UserSubmission } from './problem.service';
import { Problem } from './problem.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }
  getUserSubmissions(): Observable<UserSubmission[]> {
    const userId = this.authService.userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    if (!userId) {
      return throwError(() => new Error('User ID not available'));
    }

    return this.http.get<UserSubmission[]>(`${this.baseUrl}/Submission/GetUserSubmissions?userId=${userId}`, {
      headers: this.getHeaders()
    }).pipe(
      tap(submissions => console.log('User submissions fetched:', submissions)),
      catchError(this.handleError<UserSubmission[]>('getUserSubmissions', []))
    );
  }

  getProblems(): Observable<Problem[]> {
    return this.http.get<Problem[]>(`${this.baseUrl}/Problem/getProblems`, {
      headers: this.getHeaders()
    }).pipe(
      tap(problems => console.log('Problems fetched:', problems)),
      catchError(error => {
        console.error('Error fetching problems:', error);
        return throwError(() => new Error('Failed to fetch problems'));
      })
    );
  }

  getProblem(id: number): Observable<Problem> {
    return this.http.get<Problem>(`${this.baseUrl}/Problem/getProblem/${id}`, {
      headers: this.getHeaders()
    }).pipe(
      tap(problem => console.log('Problem fetched:', problem)),
      catchError(error => {
        console.error('Error fetching problem:', error);
        return throwError(() => new Error('Failed to fetch problem'));
      })
    );
  }

  addProblem(problem: Problem): Observable<Problem> {
    return this.http.post<any>(`${this.baseUrl}/Problem/addProblem`, problem, {
      headers: this.getHeaders()
    }).pipe(
      tap(response => console.log('Problem added:', response)),
      map(response => ({
        ...problem,
        problemId: response.id
      })),
      catchError(error => {
        console.error('Error adding problem:', error);
        return throwError(() => new Error('Failed to add problem'));
      })
    );
  }

  updateProblem(id: string | null, problem: Problem): Observable<Problem> {
    return this.http.put<Problem>(`${environment.apiUrl}/Problem/updateProblem/${id}`, problem);
  }



//
submitSolut(languageId: number, code: string, userId: string, problemId: number): Observable<SubmissionResult> {
  const submission = { languageId, code, userId, problemId };
  return this.http.post<SubmissionResult>(`${this.baseUrl}/Submission/SubmitCode`, submission, {
    headers: this.getHeaders()
  }).pipe(
    tap(response => console.log('Solution submitted:', response)),
    catchError(this.handleError<SubmissionResult>('submitSolut'))
  );
}
      // updateProblem(id: number, problem: Problem): Observable<Problem> {
      //     return this.http.post<any>(`${this.baseUrl}/Problem/updateProblem/${id}`, problem, {
      //       headers: this.getHeaders()
      //     }).pipe(
      //       tap(response => console.log('Problem updated:', response)),
      //       map(response => ({
      //         ...problem,
      //         problemId: response.id || id
      //       })),
      //       catchError(error => {
      //         console.error('Error updating problem:', error);
      //         return throwError(() => new Error('Failed to update problem'));
      //       })
      //     );
      //   }

  deleteProblem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Problem/deleteProblem/${id}`, {
      headers: this.getHeaders()
    }).pipe(
      tap(() => console.log('Problem deleted')),
      catchError(error => {
        console.error('Error deleting problem:', error);
        return throwError(() => new Error('Failed to delete problem'));
      })
    );
  }

  // Email methods
  sendEmail(emailData: { userEmail: string; subject: string; message: string }): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/Email/SendEmail`, emailData, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Email sent:', response)),
        catchError(this.handleError<any>('sendEmail'))
      );
  }

  // Language methods
  addLanguage(language: { languagesId: number; name: string }): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/Languages/addLanguage`, language, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Language added:', response)),
        catchError(this.handleError<any>('addLanguage'))
      );
  }

  getLanguages(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/Languages/getLanguages`, { headers: this.getHeaders() })
      .pipe(
        tap(languages => console.log('Languages fetched:', languages)),
        catchError(this.handleError<any[]>('getLanguages', []))
      );
  }

  getLanguage(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/Languages/getLanguage/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap(language => console.log(`Language ${id} fetched:`, language)),
        catchError(this.handleError<any>(`getLanguage id=${id}`))
      );
  }

  updateLanguage(id: number, language: { languagesId: number; name: string }): Observable<any> {
    return this.http
      .put<any>(`${this.baseUrl}/Languages/updateLanguage/${id}`, language, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log(`Language ${id} updated:`, response)),
        catchError(this.handleError<any>(`updateLanguage id=${id}`))
      );
  }

  deleteLanguage(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/Languages/deleteLanguage/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap(_ => console.log(`Language ${id} deleted`)),
        catchError(this.handleError<any>(`deleteLanguage id=${id}`))
      );
  }

  // Submission methods
  submitSolution(submission: { languageId: number; code: string; userId: string; problemId: number }): Observable<any> {
    console.log('Submitting solution:', submission);
    return this.http
      .post<any>(`${this.baseUrl}/Submission/SubmitCode`, submission, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Solution submitted:', response)),
        catchError(this.handleError<any>('submitSolution'))
      );
  }

  // Chat methods
  sendChatMessage(message: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/chat`, { message }, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Chat message sent:', response)),
        catchError(this.handleError<any>('sendChatMessage'))
      );
  }



  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);

      let errorMessage = 'An error occurred';

      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          // Network error or self-signed certificate issue
          errorMessage = 'Unable to connect to the server. Please check your network connection or server status.';
        } else if (error.status === 401) {
          // Unauthorized error
          errorMessage = 'Your session has expired. Please log in again.';
          this.authService.logout();
        } else {
          // Server-side error
          errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      } else if (error instanceof Error) {
        // Client-side error
        errorMessage = error.message;
      }

      console.error('Error message:', errorMessage);
      return throwError(() => new Error(errorMessage));
    };
  }
}
