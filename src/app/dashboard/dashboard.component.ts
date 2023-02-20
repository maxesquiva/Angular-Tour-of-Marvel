import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero, Results } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  allHeroes: Results[];

  getHeroesRandom() {
    this.heroService
      .getHeroesRandom()
      .subscribe((heroes) => (this.allHeroes = heroes));
  }

  ngOnInit(): void {
    this.getHeroesRandom();
  }
}
