import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatBotService {
  private apiUrl = 'https://localhost:7212/api/Chatbot/ask';
  constructor(private http: HttpClient) {}

  askQuestion(message: string): Observable<string> {
    return this.http.post(this.apiUrl, message, { responseType: 'text' });
  }
}
