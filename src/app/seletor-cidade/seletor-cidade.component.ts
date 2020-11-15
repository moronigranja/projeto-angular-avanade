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
  cidadeAtual : Local;

  @Output() cidadeAlteradaEvent = new EventEmitter<string>();
  @Output() fusoAlteradoEvent = new EventEmitter<string>();
  

  constructor(private geoDbService: GeoDbService,
              private route: ActivatedRoute,
              private router: Router,
              private localService: LocalService) { }

  ngOnInit() {
    this.carregarCidadeFromRoute();
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

  carregarCidadeFromRoute() {
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      if(!params?.nomeCidade){
        console.log("Não encontrado, buscando pelo IP.");
        this.localService.getRequesterLocation()
          .subscribe(local => this.atualizarCidade(local));
      }
    });

    this.route.queryParams
    .pipe(
      filter(params => params.nomeCidade),      
    )
    .subscribe(params =>{
      console.log("verificar nome");
      let nomeCidade = params.nomeCidade;
      console.log("nomeCidade da URL: ", nomeCidade);
    });
  }

  atualizarCidade(cidade: Local){
    this.cidadeAtual = cidade;
    console.log(`Cidade: ${cidade.city}, Geoname ID: ${cidade.location.geoname_id}`);

    let pipe = new FormatarNomeCidadePipe();

    this.router.navigate(['.'], {
      queryParams: {nomeCidade : pipe.transform(cidade)}, 
      queryParamsHandling: 'merge'
    });
  }

  getCityDisplayName(city: PlaceSummary) {
    if (!city) {
        return null;
    }

    let name = city.name;

    if (city.region) {
        name += ", " + city.regionCode;
    }

    name += ", " + city.country;

    console.log('getCityDisplayName ' + name);
    return name;
  }

  onCitySelected(city: PlaceSummary) {

    // this.geoDbService.findPlace({
    //   placeId: city.id
    // })
    //   .subscribe(
    //     (response: GeoResponse<PlaceDetails>) => {
    //       this.selectedCity = response.data;
    //     });

    this.atualizarDataeHoraCidade(this.getCityDisplayName(city));

    this.geoDbService.getPlaceDateTime(city.id)
    .subscribe(
           (response: GeoResponse<string>) => {
             console.log(response.data);
             this.fusoAlteradoEvent.emit(response.data);
           });
  }

  onEnter(){
    console.log("onEnter", this.cityControl.value);
    this.atualizarDataeHoraCidade(this.cityControl.value);
  }

  atualizarDataeHoraCidade(cidade : string){
    this.cidadeAlteradaEvent.emit(cidade);
  }

}
