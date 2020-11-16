import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Clima } from '../models/clima';
import { Local } from '../models/local';
import { FormatarNomeCidadePipe } from '../pipes/formatar-nome-cidade.pipe';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  url = "https://api.openweathermap.org/data/2.5/weather?q=";
  api_key = environment.OPENWEATHER_API_KEY
  unit_type = "metric";
  language = "pt_br";

  constructor(private httpClient: HttpClient) { }

  getClimaCidade(cidade: Local): Observable<Clima> {
    let formatarNomeCidadePipe = new FormatarNomeCidadePipe();

    return this.httpClient.get<Clima>(this.getFormattedURL(formatarNomeCidadePipe.transform(cidade)))
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getClimaCidadePreFormatada(cidade: string): Observable<Clima> {
    return this.httpClient.get<Clima>(this.getFormattedURL(cidade))
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `, mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

  getFormattedURL(cidade: string): string {
    return `${this.url}${cidade}&appid=${this.api_key}&units=${this.unit_type}&lang=${this.language}`;
  }

}
