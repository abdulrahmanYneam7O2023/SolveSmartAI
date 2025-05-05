import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { RouterOutlet } from '@angular/router';
import { ChatbotComponent } from '../../chatbot/chatbot.component';

@Component({
  selector: 'app-blank',
  imports: [HeaderComponent ,RouterOutlet, ChatbotComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css'
})
export class BlankComponent {

}
