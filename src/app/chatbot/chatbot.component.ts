import { Component } from '@angular/core';
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
}
