import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateString',
  standalone: true,
})
export class TruncateStringPipe implements PipeTransform {
  transform(value: string, spaces: number = 3): string {
    if (!value) return value;

    value = value.replace(/,/g, '');

    const words = value.split(' ');

    let spaceCount = 0;
    let truncated = '';

    for (let i = 0; i < words.length; i++) {
      if (i > 0) truncated += ' ';
      truncated += words[i];

      spaceCount++;
      if (spaceCount >= spaces + 1) break;
    }

    return truncated.trim();
  }
}
