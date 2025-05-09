/*import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent {
  userInput: string = '';
  responseHtml: string = '';
  isChatbotVisible: boolean = false;

  constructor(private http: HttpClient) {}

  toggleChatbot(): void {
    this.isChatbotVisible = !this.isChatbotVisible;
  }

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
          this.responseHtml = await marked.parse(markdownText);
        },
        error: (err) => {
          this.responseHtml = 'Error: ' + err.message;
        },
      });
  }
}*/

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { marked } from 'marked';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userInput: string = '';
  responseHtml: string = '';
  isChatbotVisible: boolean = false;

  constructor(private http: HttpClient) {}

  toggleChatbot(): void {
    this.isChatbotVisible = !this.isChatbotVisible;
  }

  onInputChange() {}

  private processMessage(input: string): string {
    return `<div class="message">Response to: ${input}</div>`;
  }
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
          this.responseHtml = await marked.parse(markdownText);
        },
        error: (err) => {
          this.responseHtml = 'Error: ' + err.message;
        },
      });
  }
}
