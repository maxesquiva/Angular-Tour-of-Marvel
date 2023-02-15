import { Component, OnInit } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero, Results } from '../hero';
import { HeroService } from '../hero.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent {
  // heroes$!: Observable<Hero[]>;
  allHeroes: Results[];
  heroesEncontrado$: Observable<Results[]> = of([]);
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService){}

  search(term: string): void {
    this.searchTerms.next(term);
    console.log(term);
  }


  ngOnInit(): void{
    this.heroesEncontrado$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.getSearchHero(term)),
      );
  }

}
