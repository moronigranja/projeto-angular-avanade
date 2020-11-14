import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GeoDbService } from 'wft-geodb-angular-client';
import { GeoResponse } from 'wft-geodb-angular-client/lib/model/geo-response.model';
import { PlaceDetails } from 'wft-geodb-angular-client/lib/model/place-details.model';
import { PlaceSummary } from 'wft-geodb-angular-client/lib/model/place-summary.model';

@Component({
  selector: 'app-seletor-cidade',
  templateUrl: './seletor-cidade.component.html',
  styleUrls: ['./seletor-cidade.component.css']
})
export class SeletorCidadeComponent implements OnInit {
  private MIN_CITY_POPULATION = 40000;

  selectedCity: PlaceSummary;
  cityControl: FormControl;
  filteredCities: Observable<PlaceSummary[]>;

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit() {

    this.cityControl = new FormControl();

    this.filteredCities = this.cityControl.valueChanges
      .pipe(
        switchMap( (cityNamePrefix: string) => {
          let citiesObservable: Observable<PlaceSummary[]> = of([]);

          if (cityNamePrefix && cityNamePrefix.length >= 3) {

            citiesObservable = this.geoDbService.findPlaces({
              namePrefix: cityNamePrefix,
              minPopulation: this.MIN_CITY_POPULATION,
              types: ['CITY'],
              sortDirectives: ['-population'],
              limit: 10,
              offset: 0
            })
              .pipe(
                map(
                  (response: GeoResponse<PlaceSummary[]>) => {
                    return response.data;
                  },

                  (error: any) => console.log(error)
                )
              );
          }

          return citiesObservable;
        })
      );
  }

  getCityDisplayName(city: PlaceSummary) {
    if (!city) {
        return null;
    }

    let name = city.name;

    if (city.region) {
        name += ", " + city.region;
    }

    name += ", " + city.country;

    console.log('getCityDisplayName ' + name);
    return name;
  }

  onCitySelected(city: PlaceSummary) {

    this.geoDbService.findPlace({
      placeId: city.id
    })
      .subscribe(
        (response: GeoResponse<PlaceDetails>) => {
          this.selectedCity = response.data;
        });
  }

}
