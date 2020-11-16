import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Local } from '../models/local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  url = 'http://api.ipstack.com/check?access_key=';

  constructor(private httpClient: HttpClient) { }
  
  getRequesterLocation(): Observable<Local> {
    return this.httpClient.get<Local>(this.url + environment.IPSTACK_API_KEY)
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
