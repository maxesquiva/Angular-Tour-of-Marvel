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
  // hero : Hero ={
  //   id: 1,
  //   name: 'Windstrom'
  // };
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

  // onSelected(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.addHero({ name } as Hero)
  //   .subscribe(hero => {
  //     this.heroes.push(hero);
  //   });
  // }

  // delete(hero: Hero): void {
  //   this.heroes = this.heroes.filter(h => h !== hero);
  //   this.heroService.deleteHero(hero.id).subscribe();
  // }
}
