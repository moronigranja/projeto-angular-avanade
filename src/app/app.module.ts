import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SeletorCidadeComponent } from './seletor-cidade/seletor-cidade.component';
import { HttpClientModule } from '@angular/common/http';
import { GeoDbProModule } from 'wft-geodb-angular-client';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormatarNomeCidadePipe } from './pipes/formatar-nome-cidade.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SeletorCidadeComponent,
    FormatarNomeCidadePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GeoDbProModule.forRoot({
      apiKey: "bb18e39e83msh469d01d9cc386c3p18e035jsn2da951800d92",
      serviceUri: "https://wft-geo-db.p.rapidapi.com"
    })
  ],
  exports: [
    MatSliderModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
