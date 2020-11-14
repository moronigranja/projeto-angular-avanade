import { Injectable } from '@angular/core';
import { GeoDbService } from 'wft-geodb-angular-client';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private geoDbService: GeoDbService) { }
  
}
