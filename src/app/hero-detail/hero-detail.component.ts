import { Component, Input, OnInit } from '@angular/core';
import { Hero, Results } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  
  allHeroes: Results[];

  constructor(
    // contiene información sobre la ruta a esta instancia del HeroDetailComponent
    private route: ActivatedRoute,
    // datos del héroe del servidor remoto y este componente los usa para mostrar el héroe
    private heroService: HeroService,
    // servicio de Angular para interactuar con el navegador. Este servicio le permite volver a la vista anterior
    private location: Location
  ){}

  ngOnInit(): void {
    this.getHero();
  }


  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHeroesById(id)
    .subscribe(heroes =>this.allHeroes=(heroes));
  }

  goBack(): void {
    this.location.back();
  }




}
