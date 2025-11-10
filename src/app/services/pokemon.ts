import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonItem, PokemonInfo } from '../model/pokemon.model';
import { Config } from './config';

@Injectable({
  providedIn: 'root',
})
export class Pokemon {

  constructor(private readonly http: HttpClient, private readonly config: Config) {}


  getInfoPokemons(): Observable<PokemonInfo[]> {
    const apiAllPokemonUrl = this.config.apiInfoUrl ;
    return this.http.get<PokemonInfo[]>(apiAllPokemonUrl);
  }

  getPokemonById(id: string): Observable<PokemonItem> {
    const apiAllPokemonUrl = `${this.config.apiDataUrl}${id}`;
    return this.http.get<PokemonItem>(apiAllPokemonUrl);
  }

  savePokemon(): Observable<PokemonItem> {
    const cleanUrl = this.config.apiDataUrl.slice(0, -1);
    return this.http.post<PokemonItem>(cleanUrl, null);
  }

  deletePokemon(id: string) {
    const apiAllPokemonUrl = `${this.config.apiDataUrl}${id}`;
    return this.http.delete<void>(apiAllPokemonUrl);
  }

  getPokemons(): Observable<PokemonItem[]> {
    return this.http.get<PokemonItem[]>(this.config.apiAllBaseUrl);
  }
  
}
