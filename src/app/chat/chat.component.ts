import { Component } from '@angular/core';
import { ChatBotService } from '../services/chat-bot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  userMessage: string = '';
  aiResponse: string = '';
  isLoading = false;

  constructor(private chatBotService: ChatBotService) {}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.isLoading = true;
    this.chatBotService.askQuestion(this.userMessage).subscribe({
      next: (res) => {
        this.aiResponse = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.aiResponse = 'Error: ' + err.message;
        this.isLoading = false;
      }
    });
  }
}
