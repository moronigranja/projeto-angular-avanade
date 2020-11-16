import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CidadeService } from 'src/app/services/cidade.service';
import { PlaceSummary } from 'wft-geodb-angular-client/lib/model/place-summary.model';
import { FormatarNomeCidadePipe } from '../../pipes/formatar-nome-cidade.pipe';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-seletor-cidade',
  templateUrl: './seletor-cidade.component.html',
  styleUrls: ['./seletor-cidade.component.css']
})
export class SeletorCidadeComponent implements OnInit {  

  selectedCity: PlaceSummary;
  cityControl: FormControl = new FormControl();
  filteredCities: Observable<PlaceSummary[]>;

  @Output() cidadeAlteradaEvent = new EventEmitter<string>();  

  constructor(private cidadeService: CidadeService,
              private route: ActivatedRoute,
              private router: Router,
              private localService: LocalService) { }

  ngOnInit() {    
    this.cityControl.setValue("Carregando...", {emitEvent:false});
    setTimeout(() => {
      this.carregarCidadeInicial();
    }, 1000);     
  }

  bindAutoCompleteEvent() {     

    this.filteredCities = this.cityControl.valueChanges
      .pipe(
        switchMap( (prefixoNomeCidade: string) => {
          let listaCidades: Observable<PlaceSummary[]> = of([]);

          if (prefixoNomeCidade && prefixoNomeCidade.length >= 3) {
            console.log("Buscando lista de cidade com prefixo", prefixoNomeCidade);
            listaCidades = this.cidadeService.getCidades(prefixoNomeCidade);
          }

          return listaCidades;
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
    this.bindAutoCompleteEvent(); //so faz o bind depois de carregar o valor inicial
  }

  localizarCidadePeloIP(){
    this.localService.getRequesterLocation()
    .subscribe(local => {
      let pipe = new FormatarNomeCidadePipe();
      let nomeCidade = pipe.transform(local);
      this.atualizarQueryParams(nomeCidade);
    });
  }

  atualizarQueryParams(cidade: string){
    this.router.navigate(['.'], {
      queryParams: {nomeCidade : cidade}, 
      queryParamsHandling: 'merge'
    });
  }

  getCityDisplayName(city: PlaceSummary) {
    if(typeof(city) == "string") return city; //Para tratar o caso especial do nome vir da url
    else if (!city?.name)  return null;

    let region = (city.region) ? ", " + city.regionCode : "";
    return `${city.name}${region}, ${city.country}`;
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
    console.log("Cidade selecionada:", cidade);
    this.cityControl.setValue(cidade, {emitEvent:false});
    this.cidadeAlteradaEvent.emit(cidade);
  }

}
