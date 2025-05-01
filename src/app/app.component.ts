  import { Component } from '@angular/core';
  import { HeaderComponent } from './shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SolveSmart';
}
