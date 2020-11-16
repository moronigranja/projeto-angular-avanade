import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { GeoDbService } from 'wft-geodb-angular-client';
import { GeoResponse } from 'wft-geodb-angular-client/lib/model/geo-response.model';
import { PlaceSummary } from 'wft-geodb-angular-client/lib/model/place-summary.model';
import { Local } from '../models/local';
import { FormatarNomeCidadePipe } from '../pipes/formatar-nome-cidade.pipe';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-seletor-cidade',
  templateUrl: './seletor-cidade.component.html',
  styleUrls: ['./seletor-cidade.component.css']
})
export class SeletorCidadeComponent implements OnInit {
  private MIN_CITY_POPULATION = 40000;

  selectedCity: PlaceSummary;
  cityControl: FormControl;
  filteredCities: Observable<PlaceSummary[]>;

  @Output() cidadeAlteradaEvent = new EventEmitter<string>();  

  constructor(private geoDbService: GeoDbService,
              private route: ActivatedRoute,
              private router: Router,
              private localService: LocalService) { }

  ngOnInit() {
    this.carregarCidadeInicial();
    this.bindAutoCompleteEvent();
  }

  bindAutoCompleteEvent() {
    this.geoDbService.setApiKey("bb18e39e83msh469d01d9cc386c3p18e035jsn2da951800d92");

    this.cityControl = new FormControl();

    this.filteredCities = this.cityControl.valueChanges
      .pipe(
        switchMap( (cityNamePrefix: string) => {
          let citiesObservable: Observable<PlaceSummary[]> = of([]);

          if (cityNamePrefix && cityNamePrefix.length >= 3) {

            citiesObservable = this.geoDbService.findPlaces({
              namePrefix: cityNamePrefix,
              minPopulation: this.MIN_CITY_POPULATION,
              types: ['CITY'],
              sortDirectives: ['-population'],
              limit: 10,
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
          }

          return citiesObservable;
        })
      );
  }

  carregarCidadeInicial(){
    this.route.queryParams    
    .subscribe(params => {
      let nomeCidade = params?.nomeCidade;
      this.processarNomeCidade(nomeCidade);
    });
  }

  processarNomeCidade(cidade : string){
    if(!cidade){
      console.log("Não encontrado, buscando pelo IP.");
      this.localizarCidadePeloIP();
    }
    else{
      console.log("nomeCidade da URL: ", cidade);
      this.atualizarDataeHoraCidade(cidade);
    }
  }

  localizarCidadePeloIP(){
    this.localService.getRequesterLocation()
    .subscribe(local => {
      let pipe = new FormatarNomeCidadePipe();
      let nomeCidade = pipe.transform(local);
      this.atualizarQueryParams(nomeCidade);
      this.atualizarDataeHoraCidade(nomeCidade);
    });
  }

  atualizarQueryParams(cidade: string){
    this.router.navigate(['.'], {
      queryParams: {nomeCidade : cidade}, 
      queryParamsHandling: 'merge'
    });
  }

  getCityDisplayName(city: PlaceSummary) {
    if(typeof(city) == "string"){
      return city;
    }
    else if (!city?.name) {
        return null;
    }

    let name = city.name;

    if (city.region) name += ", " + city.regionCode;
    name += ", " + city.country;
    console.log('getCityDisplayName ' + name);
    return name;
  }

  onCitySelected(city: PlaceSummary) {
    let nomeCidade = this.getCityDisplayName(city);
    this.atualizarQueryParams(nomeCidade);
    this.atualizarDataeHoraCidade(nomeCidade);
  }

  onEnter(){
    this.atualizarDataeHoraCidade(this.cityControl.value);
  }

  atualizarDataeHoraCidade(cidade : string){
    console.log("atualizarDataeHoraCidade", cidade);
    this.cityControl.setValue(cidade);
    this.cidadeAlteradaEvent.emit(cidade);
    console.log("this.cityControl.value",this.cityControl.value);
  }

}
