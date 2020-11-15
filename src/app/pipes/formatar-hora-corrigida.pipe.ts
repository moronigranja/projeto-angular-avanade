import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarHoraCorrigida'
})
export class FormatarHoraCorrigidaPipe implements PipeTransform {

  transform(value: Date, timeOffset: number): string {

    value.setSeconds(value.getUTCSeconds() + timeOffset);

    let horas = ('0' + value.getUTCHours()).slice(-2);
    let minutos = ('0' + value.getUTCMinutes()).slice(-2);
    let segundos = ('0' + value.getUTCSeconds()).slice(-2);

    // let offsetHoras = 24 + Math.floor(timeOffset / 3600);
    // let offsetMinutos = timeOffset % 3600;

    // let horas = ('0' + (value.getUTCHours() + offsetHoras) % 24).slice(-2);
    // let minutos = ('0' + (value.getUTCMinutes() + offsetMinutos) % 60).slice(-2);
    // let segundos = ('0' + value.getUTCSeconds()).slice(-2);

    return `${horas} : ${minutos} : ${segundos}`;
  }

}
