import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { SeletorCidadeComponent } from './components/seletor-cidade/seletor-cidade.component';
import { HttpClientModule } from '@angular/common/http';
import { GeoDbProModule } from 'wft-geodb-angular-client';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormatarNomeCidadePipe } from './pipes/formatar-nome-cidade.pipe';
import { RelogioComponent } from './components/relogio/relogio.component';
import { FormatarHoraCorrigidaPipe } from './pipes/formatar-hora-corrigida.pipe';
import { PrevisaoTempoComponent } from './components/previsao-tempo/previsao-tempo.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SeletorCidadeComponent,
    FormatarNomeCidadePipe,
    RelogioComponent,
    FormatarHoraCorrigidaPipe,
    PrevisaoTempoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    GeoDbProModule.forRoot({
      apiKey: environment.GEODB_API_KEY,
      serviceUri: "https://wft-geo-db.p.rapidapi.com"
    })
  ],
  exports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
