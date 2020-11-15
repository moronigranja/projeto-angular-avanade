import { Component } from '@angular/core';
import { Local } from './models/local';
import { ClimaService } from './services/clima.service';
import { FormatarNomeCidadePipe } from './pipes/formatar-nome-cidade.pipe';
import { Clima } from './models/clima';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClimaTempo';
  localTimeOffset : number = 0;
  climaAtual : Clima;

  constructor(private climaService: ClimaService){}

  ngOnInit() : void{    
  }

  atualizarClima(cidade: string){
    console.log("atualizarClima",cidade);
    if(!cidade) return;

    console.log("Atualizando clima de ", cidade);
    this.climaService.getClimaCidadePreFormatada(cidade)
    .subscribe(clima =>
      {
        console.log("temperatura", clima.main.temp, "fuso", clima.timezone);
        this.localTimeOffset = clima.timezone;
        this.climaAtual = clima;
        console.log(clima);
      });
  }

  //horarioLocal vem no formato: 2020-11-15T01:13:14.733339-03:00
  atualizarRelogio(horarioLocal : string ){
    console.log("atualizarRelogio");
    let multiplicador = horarioLocal.substr(-6,1) == '-' ? -1 : 1;
    let horas = parseInt(horarioLocal.substr(-5,2));
    let minutos = parseInt(horarioLocal.substr(-2,2));
    this.localTimeOffset =  ((horas * 3600) + (minutos * 60)) * multiplicador;
    console.log(this.localTimeOffset);
  }
}
