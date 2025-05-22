import { Component } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './country-page.component.html'
})
export class CountryPageComponent {

  onSearch(value: string){
    console.log('value', value)
  }
}
