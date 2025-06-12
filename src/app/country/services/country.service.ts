import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { countryMapper } from '../mapper/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]>{
    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map(countryMapper.mapRestCountryArrayToCountryArray),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError(() => {return throwError(() => new Error('no se pudo obtener capital con esa query'))})
    );
  }

  searchByCountry(query: string): Observable<Country[]>{
    query = query.toLowerCase();

    if(this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RestCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map(countryMapper.mapRestCountryArrayToCountryArray),
      tap(countries => this.queryCacheCountry.set(query, countries)),
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
