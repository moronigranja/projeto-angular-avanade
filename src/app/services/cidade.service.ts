import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GeoDbService } from 'wft-geodb-angular-client';
import { GeoResponse } from 'wft-geodb-angular-client/lib/model/geo-response.model';
import { PlaceSummary } from 'wft-geodb-angular-client/lib/model/place-summary.model';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private POPULACAO_MINIMA_CIDADE = 40000;
  private MAX_RESULTADOS = 7;

  constructor(private geoDbService: GeoDbService) { }

  getCidades(prefixoNomeCidade : string) : Observable<PlaceSummary[]>{
    
    this.geoDbService.setApiKey(environment.GEODB_API_KEY);

    let listaCidades = this.geoDbService.findPlaces({
      namePrefix: prefixoNomeCidade,
      minPopulation: this.POPULACAO_MINIMA_CIDADE,
      types: ['CITY'],
      sortDirectives: ['-population'],
      limit: this.MAX_RESULTADOS,
      offset: 0
    })
      .pipe(
        map(
          (response: GeoResponse<PlaceSummary[]>) => {
            return response.data;
          },
          (error: any) => console.log(error)
        )
      );

      return listaCidades;
  }
  
}
