import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { PokeService } from './service/poke.service';
import { debounceTime, takeUntil, switchMap } from 'rxjs/operators';


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

  // subjects 
  onDestroy$ = new Subject<boolean>();

  //Form Controls
  search = new FormControl("", Validators.nullValidator);

  listPokemons: any;
  pokeCount: any;
  pokemonSearchResult: any;
  pokeInfo: any = [];
  maxPagination: string;
  constructor(
    private pokeService: PokeService
  ) { }

  ngOnInit(): void {
    this.getAllPokemons();

    this.search.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        console.log(value);
        this.searchPokemon(value);
      });
  }

  getAllPokemons() {
    this.subs.push(
      this.pokeService.getAllPokemons(this.pageSize)
        .subscribe(response => {
          this.pokeCount = response.count

          const paginationResult = this.pokeCount / 20
          this.maxPagination = paginationResult.toFixed(0)

          const listpokemons = response.results
          const pokeArrayLenght = listpokemons.length
          for (var i = 0; i < pokeArrayLenght; i++) {
            this.pokeService.getPokeIcon(listpokemons[i].url)
              .subscribe(response => {
                this.pokeInfo.push(response)
                console.log(this.pokeInfo);
              })
          }
        }))
  }

  searchPokemon(searchInfo: string) {
    this.pokeService.searchPokemon(searchInfo)
      .subscribe(data => {
        this.pokemonSearchResult = data
        console.log(data);
        
      })
  }

  pageChanged(event: any) {
    this.page = event
    this.getAllPokemons();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.subs.map((subs: Subscription) => subs.unsubscribe());
  }
}
