import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  pokeUrl = "https://pokeapi.co/api/v2/pokemon";
  // https://pokeapi.co/api/v2/pokemon/?offset={qtd%20de%20pokemon%20baseada%20na%20pagina%20atual%20do%20usuario}&limit=20
  constructor(
    private http: HttpClient
  ) { }

  // retrive pokemon data (name and url)
  getAllPokemons(rowsPerPage: number) {
    return this.http.get<any>(`${this.pokeUrl}/?offset=${rowsPerPage}`)
  }
// retrive pokemon image 
  getPokemonImages(id: number) {
    return this.http.get<any>(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`)
  }

  // searchPokemon() {
  //   return this.http.
  // }
}
