import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  //  site url 
  pokeUrl = "https://pokeapi.co/api/v2/pokemon";

  constructor(
    private http: HttpClient
  ) {
  }

  // retrive pokemon data (name and url)
  getAllPokemons(rowsPerPage: number) {
    return this.http.get<any>(`${this.pokeUrl}/?offset=${rowsPerPage}`)
  }
  // retrive pokemon image 
  getPokemonImages(id: number) {
    return this.http.get<any>(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`)
  }

  searchPokemon(pokeData: any) {
    return this.http.get<any>(`${this.pokeUrl}/${pokeData}`)
  }
}
