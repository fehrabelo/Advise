import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild("scrollUpTo", { static: false }) title: ElementRef


  // observable variable
  subs: Subscription[] = [];

  pokeListExihibit = true;
  //pagination variables
  page: number = 1;
  pageSize: number = 20;
  maxPagination: any;

  // subjects 
  onDestroy$ = new Subject<boolean>();

  //Form Controls
  search = new FormControl("", Validators.nullValidator);

  listPokemons: any;
  pokeCount: any;
  pokemonSearchResult: any;
  pokeInfo: any = [];
  constructor(
    private pokeService: PokeService
  ) { }

  ngOnInit(): void {
    this.getAllPokemons();

    this.search.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .pipe(debounceTime(800))
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
              })
          }
        }))
  }

  searchPokemon(searchInfo: string) {
    this.pokeService.searchPokemon(searchInfo)
      .subscribe(data => {
        this.pokeListExihibit = false
        this.pokemonSearchResult = data
      })

  }

  pageChanged(event: any) {
    this.page = event
    this.getAllPokemons();
  }

  //scroll pagination
  scrollTop() {
    this.title.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.subs.map((subs: Subscription) => subs.unsubscribe());
  }
}
