import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CodeEditorComponent } from '../code-edito/code-edito.component';


@Component({
  selector: 'app-problem-detail',
  imports: [ CommonModule, FormsModule, MatChipsModule,
     MatDividerModule, MatFormFieldModule,
     MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, CodeEditorComponent, MatProgressSpinnerModule],
  standalone: true,
  templateUrl: './problem-detail.component.html',
  styleUrl: './problem-detail.component.css'
})
export class ProblemDetailComponent {
  problem: any = null; // سيتم ملؤها بالبيانات الفعلية
  selectedLanguage: string = 'javascript';
  code: string = '';
  isSubmitting: boolean = false;
  result: any = null;

  languages = [
    { value: 'javascript', viewValue: 'JavaScript' },
    { value: 'typescript', viewValue: 'TypeScript' },
    { value: 'python', viewValue: 'Python' },
    { value: 'java', viewValue: 'Java' },
    { value: 'csharp', viewValue: 'C#' }
  ];

  getDifficultyColor(difficulty: string): string {
    switch(difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FFC107';
      case 'Hard': return '#F44336';
      default: return '#9E9E9E';
    }
  }

  onLanguageChange() {
    console.log('Language changed to:', this.selectedLanguage);
    // يمكنك إضافة منطق إضافي هنا عند تغيير اللغة
  }

  submitSolution() {
    this.isSubmitting = true;
    console.log('Submitting solution:', this.code);

    // محاكاة إرسال الحل إلى الخادم
    setTimeout(() => {
      this.result = {
        success: Math.random() > 0.5,
        output: 'Sample output',
        error: this.result?.success ? null : 'Sample error message',
        executionTime: Math.floor(Math.random() * 1000),
        memoryUsed: Math.floor(Math.random() * 100),
        testCasesPassed: Math.floor(Math.random() * 10),
        totalTestCases: 10
      };
      this.isSubmitting = false;
    }, 2000);

    imports: [

      CodeEditorComponent
    ]
  }

}
