import { Country } from "../interfaces/country.interface";
import { RestCountry } from "../interfaces/rest-countries.interface";

export class countryMapper {
    // static Restcountry => country
    static mapRestCountryToCountry(restCountry: RestCountry): Country {
        return {
            capital: restCountry.capital?.join(','),
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagSvg: restCountry.flags.svg,
            name: restCountry.translations['spa'].common ?? 'no spanish name',
            population: restCountry.population,
            region: restCountry.region,
            subRegion: restCountry.subregion
        };
    }

    //restCountry[] => country[]
    static mapRestCountryArrayToCountryArray(
        restCountry: RestCountry[]
    ): Country[] {
        return restCountry.map(countryMapper.mapRestCountryToCountry);
    }
}
