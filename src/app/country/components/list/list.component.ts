import { Component, input, signal } from '@angular/core';
import { RestCountry } from '../../interfaces/rest-countries.interface';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [CommonModule, DecimalPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  countries = input.required<Country[]>();
}
