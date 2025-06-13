import { Component, inject, resource, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent {
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryService = inject(CountryService);
  selected = signal('');

  countryResource = resource({
    request: () => ({ selected: this.selected() }),
    loader: async ({ request }) => {
      if(!request.selected) return [];

      return await firstValueFrom(
        this.countryService.searchByRegion(request.selected)
      );
    },
  });
}
