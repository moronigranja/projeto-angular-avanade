import { Component, Input, OnInit } from '@angular/core';
import { Clima } from '../models/clima';

@Component({
  selector: 'app-previsao-tempo',
  templateUrl: './previsao-tempo.component.html',
  styleUrls: ['./previsao-tempo.component.css']
})
export class PrevisaoTempoComponent implements OnInit {

  @Input() climaAtual : Clima;

  constructor() { }

  ngOnInit(): void {
  }

}
