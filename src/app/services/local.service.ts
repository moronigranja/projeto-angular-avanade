import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Local } from '../models/local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  url = 'http://api.ipstack.com/check?access_key=8e1e6676f5519e5318ba9a8e88d677af';

  constructor(private httpClient: HttpClient) { }
  
  getRequesterLocation(): Observable<Local> {
    return this.httpClient.get<Local>(this.url)
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

}
