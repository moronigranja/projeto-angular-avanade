import { Component, Input, OnInit } from '@angular/core';
import { Clima } from '../models/clima';

@Component({
  selector: 'app-previsao-tempo',
  templateUrl: './previsao-tempo.component.html',
  styleUrls: ['./previsao-tempo.component.css']
})
export class PrevisaoTempoComponent implements OnInit {

  // temperaturaAtual : string = "27 C";
  // sensacaoTermica : string = "24 C";
  // descricao : string = "Nuvens Esparsas";
  // urlBase : string = "http://openweathermap.org/img/wn/";
  // urlIcone : string = "https://openweathermap.org/img/wn/02d@2x.png";
  @Input() climaAtual : Clima;

  constructor() { }

  ngOnInit(): void {
  }

}
