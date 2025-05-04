import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProblemService {
  // Temporary problem models for development use
  private mockProblems = [
    {
      id: 1,
      title: 'Two Sum',
      description:
        'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      difficultyLevel: 'Easy',
      tags: ['Array', 'Hash Table'],
      sampleInput: '[2, 7, 11, 15], target = 9',
      sampleOutput: '[0, 1]',
      constraints:
        'You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    },
    {
      id: 2,
      title: 'Add Two Numbers',
      description:
        'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
      difficultyLevel: 'Medium',
      tags: ['Linked List', 'Math', 'Recursion'],
      sampleInput: 'l1 = [2,4,3], l2 = [5,6,4]',
      sampleOutput: '[7,0,8]',
      constraints: 'Each linked list has at most 100 nodes.',
    },
    {
      id: 3,
      title: 'Median of Two Sorted Arrays',
      description:
        'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
      difficultyLevel: 'Hard',
      tags: ['Array', 'Binary Search', 'Divide and Conquer'],
      sampleInput: 'nums1 = [1,3], nums2 = [2]',
      sampleOutput: '2.00000',
      constraints: 'The overall run time complexity should be O(log (m+n)).',
    },
  ];

  constructor(private apiService: ApiService) {}

  // Get list of problems
  getProblems(): Observable<any[]> {
    // In production environment, use apiService
    // return this.apiService.getProblems();

    // For development, we use temporary data
    return of(this.mockProblems);
  }

  // Get a problem by ID
  getProblem(id: number): Observable<any> {
    // In production environment, use apiService
    // return this.apiService.getProblem(id);

    // For development, we use temporary data
    const problem = this.mockProblems.find((p) => p.id === id);
    return of(problem);
  }

  // Add a new problem
  addProblem(problem: any): Observable<any> {
    // In production environment, use apiService
    // return this.apiService.addProblem(problem);

    // For development, we add the problem to temporary data
    const newId = Math.max(...this.mockProblems.map(p => p.id), 0) + 1;
    const newProblem = { ...problem, id: newId };
    this.mockProblems.push(newProblem);
    return of(newProblem);
  }

  // Update an existing problem
  updateProblem(id: number, problem: any): Observable<any> {
    // In production environment, use apiService
    // return this.apiService.updateProblem(id, problem);

    // For development, we update the problem in temporary data
    const index = this.mockProblems.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProblems[index] = { ...problem, id };
      return of(this.mockProblems[index]);
    }
    return of(null);
  }

  // Delete a problem
  deleteProblem(id: number): Observable<any> {
    // In production environment, use apiService
    // return this.apiService.deleteProblem(id);

    // For development, we delete the problem from temporary data
    const initialLength = this.mockProblems.length;
    this.mockProblems = this.mockProblems.filter(p => p.id !== id);
    const success = initialLength > this.mockProblems.length;
    return of({ success });
  }

  // Submit a solution for a problem
  submitSolution(
    problemId: number,
    code: string,
    language: string
  ): Observable<any> {
    // return this.apiService.submitSolution(problemId, code, language);

    // Simulate solution submission for development
    const randomSuccess = Math.random() > 0.3;
    return of({
      success: randomSuccess,
      output: randomSuccess ? 'Test cases passed!' : 'Failed at test case 2',
      error: randomSuccess ? null : 'Runtime error: index out of bounds',
      executionTime: Math.floor(Math.random() * 1000),
      memoryUsed: Math.floor(Math.random() * 100),
      testCasesPassed: randomSuccess ? 10 : Math.floor(Math.random() * 9),
      totalTestCases: 10,
    });
  }
}
