import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';

// واجهة لتعريف نوع اللغة
interface Language {
  languagesId: number;
  name: string;
}

@Component({
  selector: 'app-language-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './language-management.component.html',
  styleUrls: ['./language-management.component.css'],
})
export class LanguageManagementComponent implements OnInit {
  languages: Language[] = [];
  editMode: boolean = false;
  currentLanguageId: number | null = null;

  private readonly _formBuilder = inject(FormBuilder);

  // إعداد النموذج مع التحقق
  addLanguageForm: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    languagesId: [0],
  });

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadLanguages();
  }

  // جلب اللغات
  loadLanguages(): void {
    this.apiService.getLanguages().subscribe({
      next: (languages) => {
        this.languages = languages;
      },
      error: (error) => {
        console.error('Error loading languages:', error);
        this.showSnackBar('Failed to load languages');
      },
    });
  }

  // إرسال النموذج (إضافة أو تعديل)
  onSubmit(): void {
    if (this.addLanguageForm.invalid) {
      this.showSnackBar('Please fill in the required fields');
      return;
    }

  //   const languageData = this.addLanguageForm.value;

  //   if (this.editMode && this.currentLanguageId !== null) {
  //     // وضع التعديل
  //     this.apiService.updateLanguage(this.currentLanguageId, languageData).subscribe({
  //       next: (response) => {
  //         const index = this.languages.findIndex((l) => l.languagesId === this.currentLanguageId);
  //         if (index !== -1) {
  //           this.languages[index] = response;
  //           this.languages = [...this.languages]; // تحديث القائمة
  //         }
  //         this.showSnackBar('Language updated successfully');
  //         this.resetForm();
  //       },
  //       error: (error) => {
  //         console.error('Error updating language:', error);
  //         this.showSnackBar('Failed to update language');
  //       },
  //     });
  //   } else {
  //     // وضع الإضافة
  //     this.apiService.addLanguage(languageData).subscribe({
  //       next: (response) => {
  //         this.languages = [...this.languages, response]; // إضافة اللغة الجديدة
  //         this.showSnackBar('Language added successfully');
  //         this.resetForm();
  //       },
  //       error: (error) => {
  //         console.error('Error adding language:', error);
  //         this.showSnackBar('Failed to add language');
  //       },
  //     });
  //   }
  // }

  // // تحرير لغة
  // editLanguage(language: Language): void {
  //   this.editMode = true;
  //   this.currentLanguageId = language.languagesId;
  //   this.addLanguageForm.patchValue({
  //     name: language.name,
  //     languagesId: language.languagesId,
  //   });
  // }

  const languageData = this.addLanguageForm.value;

    if (this.editMode && this.currentLanguageId !== null) {
      // وضع التعديل
      this.apiService.updateLanguage(this.currentLanguageId, { languagesId: this.currentLanguageId, name: languageData.name }).subscribe({
        next: (updatedLanguage: Language) => {
          const index = this.languages.findIndex((l) => l.languagesId === this.currentLanguageId);
          if (index !== -1) {
            this.languages[index] = updatedLanguage; // تحديث اللغة المعدّلة
            this.languages = [...this.languages]; // تحديث القائمة
          }
          this.showSnackBar('Language updated successfully');
          this.loadLanguages();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error updating language:', error);
          this.showSnackBar('Failed to update language');
        },
      });
    } else {
      // وضع الإضافة
      this.apiService.addLanguage({ languagesId: 0, name: languageData.name }).subscribe({
        next: (response: Language) => {
          this.languages = [...this.languages, response]; // إضافة اللغة الجديدة
          this.showSnackBar('Language added successfully');
           this.loadLanguages();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error adding language:', error);
          this.showSnackBar('Failed to add language');
        },
      });
    }
  }

  // تحرير لغة
  editLanguage(language: Language): void {
    this.editMode = true;
     
    this.currentLanguageId = language.languagesId;
    this.addLanguageForm.patchValue({
      name: language.name,
      languagesId: language.languagesId,
    });
  }
  

  // حذف لغة
  deleteLanguage(id: number): void {
    if (confirm('Are you sure you want to delete this language?')) {
      this.apiService.deleteLanguage(id).subscribe({
        next: () => {
          this.languages = this.languages.filter((l) => l.languagesId !== id);
          this.showSnackBar('Language deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting language:', error);
          this.showSnackBar('Failed to delete language');
        },
      });
    }
  }

  // إعادة تعيين النموذج
  resetForm(): void {
    this.addLanguageForm.reset({ name: '', languagesId: 0 });
    this.editMode = false;
    this.currentLanguageId = null;
  }

  // عرض إشعار
  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}
