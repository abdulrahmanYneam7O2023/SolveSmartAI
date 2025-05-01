import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { marked } from 'marked';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  userInput: string = '';
  responseHtml: string = '';

  constructor(private http: HttpClient) {}

  async sendMessage(): Promise<void> {
    if (!this.userInput.trim()) {
      this.responseHtml = 'Please enter a message.';
      return;
    }
  
    this.responseHtml = 'Loading...';
  
    const headers = new HttpHeaders({
      Authorization:
        'Bearer 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',
      'HTTP-Referer': 'https://www.sitename.com',
      'X-Title': 'SiteName',
      'Content-Type': 'application/json',
    });
  
    const body = {
      model: 'deepseek/deepseek-r1:free',
      messages: [{ role: 'user', content: this.userInput }],
    };
  
    this.http
      .post<any>('https://openrouter.ai/api/v1/chat/completions', body, { headers })
      .subscribe({
        next: async (data) => {
          const markdownText = data?.choices?.[0]?.message?.content || 'No response received.';
          this.responseHtml = await marked.parse(markdownText); // حل المشكلة هنا
        },
        error: (err) => {
          this.responseHtml = 'Error: ' + err.message;
        },
      });
  }
  
}
