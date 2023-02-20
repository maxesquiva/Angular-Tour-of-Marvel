import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero, Results } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService) {}

  offset: number = 0;

  allHeroes: Results[];


  //TODO botnes que amenten de 20 en 20
  getHeroes() {
    this.heroService
      .getHeroes(this.offset)
      .subscribe((heroes: Results[]) => (this.allHeroes = heroes));
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  //TODO si llegas al final no puedes sumar 20.

  back(): void {
    if (this.offset >= 20) {
      this.offset = this.offset - 20;
      this.getHeroes();
    }
  }

  next(): void {
    this.offset = this.offset + 20;
    this.getHeroes();
  }

}
