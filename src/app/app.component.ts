import { Component } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FloatingChatbotComponent } from './shared/floating-chatbot/floating-chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HeaderComponent, FloatingChatbotComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SolveSmart';
}
