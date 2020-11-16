import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Clima } from '../../models/clima';
import { ClimaService } from '../../services/clima.service';

@Component({
  selector: 'app-previsao-tempo',
  templateUrl: './previsao-tempo.component.html',
  styleUrls: ['./previsao-tempo.component.css']
})
export class PrevisaoTempoComponent implements OnInit {

  @Input() nomeCidade : string = "";
  localTimeOffset : number = 0;
  climaAtual : Clima;

  constructor(private climaService: ClimaService) {     
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.atualizarClimaCidade(changes['nomeCidade'].currentValue);
  }

  atualizarCidadeAtual (cidade : string){
    this.atualizarClimaCidade(cidade);
    this.iniciarTimerAtualizacaoPeriodica(cidade);
  }

  iniciarTimerAtualizacaoPeriodica(cidade : string){
    setInterval(() => {
      this.atualizarClimaCidade(cidade);
    }, 60000);
  }

  atualizarClimaCidade(cidade : string) {
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

}
