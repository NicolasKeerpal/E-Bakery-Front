import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractTabData'
})
export class ExtractTabDataPipe implements PipeTransform {

  transform(value: { success: boolean, data: any[] }): any[] {
    if (value.success) {
      return value.data;
    } else {
      return [];
    }
  }

}
