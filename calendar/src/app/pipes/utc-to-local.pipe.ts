import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcToLocal',
})
export class UtcToLocalPipe implements PipeTransform {
  transform(utcDate: string[]): string {
    const localDate = new Date(`${utcDate[0]}T${utcDate[1]}Z`)
    return localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  }
}