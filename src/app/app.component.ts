import { Component } from '@angular/core';
import { LocalService } from './services/local.service';
import { Local } from './models/local';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ClimaService } from './services/clima.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClimaTempo';
  cidadeAtual : Local;
  temperatura = "X";

  constructor(private localService: LocalService, 
              private route: ActivatedRoute, 
              private router: Router,
              private climaService: ClimaService){}

  ngOnInit() : void{
    this.localService.getRequesterLocation()
      .subscribe(local => this.atualizarCidade(local));
  }

  atualizarCidade(cidade: Local){
    this.cidadeAtual = cidade;
    console.log(`Cidade: ${cidade.city}, Geoname ID: ${cidade.location.geoname_id}`);
    this.router.navigate(['.'], {
      queryParams: cidade, 
      queryParamsHandling: 'merge'
    });
    this.atualizarClima(cidade);
  }

  atualizarClima(cidade: Local){
    if(!cidade) return;

    console.log("Atualizando clima de ", cidade.city);
    this.climaService.getClimaCidade(cidade)
    .subscribe(clima =>
      {
        console.log(clima.main.temp);
        this.temperatura = `${clima.main.temp}° C`;
      });
  }
}
