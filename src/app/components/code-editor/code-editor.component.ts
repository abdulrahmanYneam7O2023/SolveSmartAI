import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-code-editor',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="code-editor">
      <textarea
        [(ngModel)]="code"
        (ngModelChange)="onCodeChange($event)"
        [placeholder]="'Write your code here...'"
        class="editor-textarea"
      ></textarea>
    </div>
  `,
    styles: [`
    .code-editor {
      width: 100%;
      height: 400px;
      border: 1px solid #ccc;
      border-radius: 4px;
      overflow: hidden;
    }
    .editor-textarea {
      width: 100%;
      height: 100%;
      padding: 10px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 14px;
      line-height: 1.5;
      border: none;
      resize: none;
      outline: none;
    }
  `]
})
export class CodeEditorComponent {
    @Input() language: string = 'javascript';
    @Input() code: string = '';
    @Output() codeChange = new EventEmitter<string>();

    onCodeChange(newCode: string): void {
        this.code = newCode;
        this.codeChange.emit(newCode);
    }
} 