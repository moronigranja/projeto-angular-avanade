import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nomeCidade : string;

  constructor(){}

  ngOnInit() : void{    
  }

  atualizarInfoCidade(cidade: string){
    console.log("atualizarInfoCidade",cidade);
    this.nomeCidade = cidade;
  }
}
