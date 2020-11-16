# ProjetoAngularAvanade

Nesta aplicação, é possível digitar o nome de uma cidade, e verificar o clima e hora atual na localidade. Ao abrir a primeira vez,
o local atual é verificado através do geolocalização IP. É possível digitar o nome de uma cidade, e o aplicativo vai tentar autocompletar o nome da cidade. O nome da cidade é salvo na URL, podendo ser guardado nos favoritos.

Este projeto tem como objetivo demonstrar o meu domínio de Angular como parte do projeto de aceleração da [Avanade](https://www.avanade.com/pt-br) em parceria com a [Digital Innovation One](https://digitalinnovation.one/).

O projeto utiliza os seguintes components do [Angular Material](https://material.angular.io/).

* Autocomplete
* Card
* FormField
* Spinner

As seguintes APIs foram utilizadas:

* [OpenWeatherMap](https://rapidapi.com/community/api/open-weather-map/details) (via rapidapi) - para dados de clima
* [GeoDBCites](http://geodb-cities-api.wirefreethought.com./) - para autocompletar a lista de cidade
* [IPStack](https://ipstack.com/) - para localização IP

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 10.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
