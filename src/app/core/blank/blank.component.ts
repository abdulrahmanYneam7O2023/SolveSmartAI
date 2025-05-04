import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank',
  imports: [HeaderComponent ,RouterOutlet],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css'
})
export class BlankComponent {

}
