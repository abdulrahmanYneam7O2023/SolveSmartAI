import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficultyLabel'
})
export class DifficultyLabelPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Easy';
      case 1:
        return 'Medium';
      case 2:
        return 'Hard';
      case 3:
        return 'Very Hard';
      default:
        return 'Unknown';
    }
  }
}