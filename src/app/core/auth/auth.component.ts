import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [HeaderComponent ,RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
