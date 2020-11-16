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

  atualizarInfoCidade(cidade: string){
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
}
