import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html'
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }), 
    loader: ({ request }) => {
      if(!request.query) return of([]);

      return this.countryService.searchByCountry(request.query)
    },
  });

  // con promesas
  // countryResource = resource({
  //   request: () => ({ query: this.query() }), 
  //   loader: async ({ request }) => {
  //     if(!request.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.query)
  //     );
  //   },
  // });
}
