import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';
import { CountryService } from '../../services/country.service';
import { RestCountry } from '../../interfaces/rest-countries.interface';
import { countryMapper } from '../../mapper/country.mapper';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  // resource esta en fase experimental
  countryResource = resource({
    request: () => ({ query: this.query() }), 
    loader: async ({ request }) => {
      if(!request.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      );
    },
  });
}
