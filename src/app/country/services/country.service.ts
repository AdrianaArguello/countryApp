import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { countryMapper } from '../mapper/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]>{
    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map(countryMapper.mapRestCountryArrayToCountryArray),
      catchError(() => {return throwError(() => new Error('no se pudo obtener capital con esa query'))})
    );
  }

  searchByCountry(query: string): Observable<Country[]>{
    return this.http.get<RestCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map(countryMapper.mapRestCountryArrayToCountryArray),
      delay(3000), 
      catchError(() => {return throwError(() => new Error('no se pudo obtener paises con esa query'))})
    );
  }

  searchCountryByAlphaCode(query: string): Observable<any>{
    return this.http.get<RestCountry[]>(`${API_URL}/alpha/${query}`).pipe(
      map(countryMapper.mapRestCountryArrayToCountryArray),
      map((countries) => countries.at(0)),
      catchError(() => {return throwError(() => new Error('no se pudo obtener paises con esa query'))})
    );
  }
}
