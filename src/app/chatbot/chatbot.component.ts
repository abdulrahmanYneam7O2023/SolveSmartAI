/*import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  isLoading: boolean = false;

  constructor(private apiService: ApiService) {}

  async sendMessage(): Promise<void> {
    if (!this.userInput.trim()) {
      this.responseHtml = 'Please enter a message.';
      return;
    }

    this.isLoading = true;
    this.responseHtml = 'Loading...';

    // Use API service to send the message
    this.apiService.sendChatMessage(this.userInput).subscribe({
      next: async (data) => {
        const markdownText =
          data?.choices?.[0]?.message?.content || 'No response received.';
        try {
          this.responseHtml = await marked.parse(markdownText);
        } catch (error) {
          console.error('Error parsing markdown:', error);
          this.responseHtml = markdownText;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error in chat API:', err);
        this.responseHtml = 'Error: ' + (err.message || 'An error occurred');
        this.isLoading = false;
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
