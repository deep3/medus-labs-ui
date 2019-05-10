import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fontAwesomeBool'})
export class FontAwesomeBoolPipe implements PipeTransform {
    transform(value: string): string {
      if (value) {
          return '<i class="fa fa-check"></i>';
      }
      return '<i class="fa fa-remove"></i>';

      }
}
