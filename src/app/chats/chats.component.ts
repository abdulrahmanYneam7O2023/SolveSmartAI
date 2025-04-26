import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-chats',
  imports: [CommonModule, FormsModule, MatIconModule, MatFormFieldModule, MatInputModule,],
  templateUrl: './chats.component.html',
  styleUrls:[ './chats.component.css']
})
export class ChatsComponent {
  newMessage: string = '';

  currentSession: any = { messages: [] };
isLoading: boolean = false;
  getMessageClasses(message: any) {

    return {
      'my-message': message.isMine,
      'other-message': !message.isMine
    };
  }

  formatTimestamp(timestamp: number) {

    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  }
  sendMessage() {
    if (!this.newMessage.trim()) {
      return;
    }


    this.currentSession.messages.push({
      sender: 'user',
      content: this.newMessage,
      timestamp: Date.now(),
      isMine: true
    });


    this.newMessage = '';


    this.isLoading = true;
    setTimeout(() => {
      this.currentSession.messages.push({
        sender: 'ai',
        content: 'Solve Team welcomes you, how can we help you?',
        timestamp: Date.now(),
        isMine: false
      });
      this.isLoading = false;
    }, 1000);
  }

}

