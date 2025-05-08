// user-statistics.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { UserSubmission } from '../../services/problem.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-statistics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {
  submissions: UserSubmission[] = [];
  filteredSubmissions: UserSubmission[] = [];
  isLoading = true;
  error: string | null = null;

  // Statistics
  totalSubmissions = 0;
  correctSubmissions = 0;
  averageSuccessRate = 0;

  // Pagination
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;

  // Make Math available in the template
  Math = Math;

  // Sorting
  sortColumn: string = 'submissionId';
  sortDirection: 'asc' | 'desc' = 'desc';

  // Selected submission for details
  selectedSubmission: UserSubmission | null = null;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadSubmissions();
  }

  loadSubmissions(): void {
    this.isLoading = true;
    this.apiService.getUserSubmissions().subscribe({
      next: (data) => {
        this.submissions = data;
        this.calculateStatistics();
        this.sortSubmissions();
        this.updatePage();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading submissions:', error);
        this.error = 'Failed to load submissions. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  calculateStatistics(): void {
    this.totalSubmissions = this.submissions.length;
    this.correctSubmissions = this.submissions.filter(s => s.aiEvaluation.isCorrect).length;

    if (this.totalSubmissions > 0) {
      const totalRate = this.submissions.reduce((sum, submission) => sum + submission.successRate, 0);
      this.averageSuccessRate = totalRate / this.totalSubmissions;
    } else {
      this.averageSuccessRate = 0;
    }
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePage();
  }

  changePageSize(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.pageSize = parseInt(select.value, 10);
    this.currentPage = 1; // Reset to first page
    this.updatePage();
  }

  sortSubmissions(column?: string): void {
    if (column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'desc';
      }
    }

    const direction = this.sortDirection === 'asc' ? 1 : -1;

    this.submissions.sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (this.sortColumn) {
        case 'sId':
          valueA = a.sId || 0;
          valueB = b.sId || 0;
          break;
        case 'isSuccesfull':
          valueA = a.isSuccesfull ? 1 : 0;
          valueB = b.isSuccesfull ? 1 : 0;
          break;
        case 'isCorrect':
          valueA = a.aiEvaluation.isCorrect ? 1 : 0;
          valueB = b.aiEvaluation.isCorrect ? 1 : 0;
          break;
        case 'successRate':
          valueA = a.successRate;
          valueB = b.successRate;
          break;
        default:
          valueA = a.sId || 0;
          valueB = b.sId || 0;
      }

      return (valueA < valueB) ? -1 * direction : (valueA > valueB) ? 1 * direction : 0;
    });

    this.updatePage();
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredSubmissions = this.submissions.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.submissions.length / this.pageSize);
  }

  formatDate(): string {
    const date = new Date();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  formatPercent(value: number): string {
    return (value * 10).toFixed(1) + '%'; // لأن successRate من 1-10 وليس من 0-1
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;

    if (this.totalPages <= maxPagesToShow) {
      // Show all pages if there are few
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show a window of pages around current page
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

      // Adjust if we're near the end
      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  showSubmissionDetails(submission: UserSubmission): void {
    this.selectedSubmission = submission;
  }

  closeSubmissionDetails(): void {
    this.selectedSubmission = null;
  }
}
