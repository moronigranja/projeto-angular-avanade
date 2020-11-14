import { Pipe, PipeTransform } from '@angular/core';
import { Local } from '../models/local';

@Pipe({
  name: 'formatarNomeCidade'
})
export class FormatarNomeCidadePipe implements PipeTransform {

  transform(value: Local): string {
    if (!value) return null;

    let name = value.city;

    if (value.region_code) {
      name += ", " + value.region_code;
    }

    name += ", " + value.country_name;
    return name;
  }

}
