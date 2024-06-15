import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDateFormat'
})
export class DueDateFormatPipe implements PipeTransform {

  transform(value: Date | null): string {
    if (!value) {
      return 'in progress...';
    }
    const day = value.getDate().toString().padStart(2, '0');
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const year = value.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
