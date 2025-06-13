import { Component, effect, input, linkedSignal, output, signal, } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  placeholder = input<string>('Buscar');
  debounceTime = input<number>(300);
  initialValue = input<string>('');

  searchText = output<string>();
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

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
