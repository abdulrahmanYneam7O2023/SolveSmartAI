import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApiService } from '../../services/api.service';
import { marked } from 'marked';

@Component({
  selector: 'app-floating-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './floating-chatbot.component.html',
  styleUrls: ['./floating-chatbot.component.css']
})
export class FloatingChatbotComponent implements OnInit {
  isOpen: boolean = false;
  userInput: string = '';
  messages: Array<{type: 'user' | 'bot', content: string, html?: string}> = [];
  isLoading: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Add initial greeting message
    this.messages.push({
      type: 'bot',
      content: 'Hello! How can I help you today?',
      html: '<p>Hello! How can I help you today?</p>'
    });
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  async sendMessage(): Promise<void> {
    if (!this.userInput.trim()) {
      return;
    }

    // Add user message
    this.messages.push({
      type: 'user',
      content: this.userInput
    });

    const userMessage = this.userInput;
    this.userInput = ''; // Clear input field
    this.isLoading = true;

    // Add temporary loading message
    const loadingMsgIndex = this.messages.length;
    this.messages.push({
      type: 'bot',
      content: 'Loading...',
      html: '<p>Loading...</p>'
    });

    // Use API service to send the message
    this.apiService.sendChatMessage(userMessage).subscribe({
      next: async (data) => {
        const markdownText = data?.choices?.[0]?.message?.content || 'No response received.';
        try {
          const html = await marked.parse(markdownText);
          // Replace loading message with actual response
          this.messages[loadingMsgIndex] = {
            type: 'bot',
            content: markdownText,
            html: html
          };
        } catch (error) {
          console.error('Error parsing markdown:', error);
          this.messages[loadingMsgIndex] = {
            type: 'bot',
            content: markdownText,
            html: `<p>${markdownText}</p>`
          };
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error in chat API:', err);
        this.messages[loadingMsgIndex] = {
          type: 'bot',
          content: 'Error: ' + (err.message || 'Unknown error occurred'),
          html: `<p>Error: ${err.message || 'Unknown error occurred'}</p>`
        };
        this.isLoading = false;
      },
    });
  }
}