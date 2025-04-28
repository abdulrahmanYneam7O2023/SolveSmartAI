import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})

export class ChatComponent {
  userInput = '';
  messages: { from: string, text: string }[] = [];

  sendMessage() {
    if (!this.userInput.trim()) return;


    
    this.messages.push({ from: 'user', text: this.userInput });

    
    fetch('https://localhost:7212', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: this.userInput })
    })
    .then(response => response.json())
    .then(data => {
   
      this.messages.push({ from: 'bot', text: data.response });
    })
    .catch(error => {
      console.error('Error:', error);

    });

    this.userInput = '';
  }

}
