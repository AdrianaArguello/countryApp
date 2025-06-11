import { Component, effect, input, output, signal, } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  placeholder = input<string>();
  debounceTime = input<number>(300);
  searchText = output<string>();
  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.searchText.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout)
    });
  });
}
