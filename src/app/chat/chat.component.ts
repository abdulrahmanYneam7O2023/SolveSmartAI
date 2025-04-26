import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatBotService } from '../services/chat-bot.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userMessage: string = '';
  aiResponse: string = '';
  isLoading = false;

  constructor(private chatBotService: ChatBotService) {}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.isLoading = true;
    console.log('Sending message:', this.userMessage);  // إضافة هذا لتتبع البيانات
    this.chatBotService.askQuestion(this.userMessage).subscribe({
      next: (res) => {
        this.aiResponse = res;
        this.isLoading = false;
        console.log('Received response:', res);  // إضافة هذا لتتبع الرد
      },
      error: (err) => {
        this.aiResponse = 'Error: ' + err.message;
        this.isLoading = false;
        console.error('Error:', err);  // إضافة هذا لتتبع الخطأ
      }
    });
  }

}
