import { Component, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';

@Component({
  selector: 'app-country-info',
  imports: [],
  templateUrl: './country-info.component.html',
  styleUrl: './country-info.component.css'
})
export class CountryInfoComponent {
  country = input.required<Country>();
}
