import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';


function validateQueryParam( queryParam: string ): Region {
  queryParam = queryParam.toLowerCase();

  const validRegion: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctica': 'Antarctic'
  };

  return validRegion[queryParam] ?? 'Americas';
}

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

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = (this.activatedRoute.snapshot.queryParamMap.get('region') ?? '');
  selected = linkedSignal<Region>(() =>
    validateQueryParam(this.queryParam)
  );

  countryResource = resource({
    request: () => ({ selected: this.selected() }),
    loader: async ({ request }) => {
      if(!request.selected) return [];

      this.router.navigate(['/by-region'], {
        queryParams: {
          region: request.selected
        }
      });

      return await firstValueFrom(
        this.countryService.searchByRegion(request.selected)
      );
    },
  });
}
