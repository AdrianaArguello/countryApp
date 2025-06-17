import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html'
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = signal(this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if(!request.query) return of([]);

      this.router.navigate(['/by-country'], {
        queryParams: {
          query: request.query
        }
      });

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
