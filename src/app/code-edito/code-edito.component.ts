import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-edito',
  imports: [ CommonModule, FormsModule],
  templateUrl: './code-edito.component.html',
  styleUrls: ['./code-edito.component.css']
})
export class CodeEditorComponent {
  @Input() code: string = '';
  @Input() language: string = 'javascript';
  @Output() codeChange = new EventEmitter<string>();

  onCodeChange(event: Event) {
    const newCode = (event.target as HTMLTextAreaElement).value;
    this.code = newCode;
    this.codeChange.emit(newCode);
  }
}
