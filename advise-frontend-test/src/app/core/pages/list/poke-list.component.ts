import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokeService } from './service/poke.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit, OnDestroy {

  // observable variable
  subs: Subscription[] = [];
 
  //pagination variables
   page: number = 1;
   pageSize: number = 5;
   showcaseMax: number = 20;

  constructor(
    private pokeService: PokeService
  ) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  getAllPokemons() {
    this.subs.push(
      this.pokeService.getAllPokemons(this.pageSize)
        .subscribe(response => {
          console.log(response);
        }))
  }

  getPokemonsImages(){
    
  }

  searchPokemon(){
    this.subs.push(

    )
  }

  pageChanged(event: any) {
    this.page = event
    this.getAllPokemons();
  }

  ngOnDestroy(): void {
    this.subs.map((subs: Subscription) => subs.unsubscribe());
  }
}
