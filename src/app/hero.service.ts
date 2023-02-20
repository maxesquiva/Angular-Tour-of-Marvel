import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero, Results } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  private apiUrl: string ='https://gateway.marvel.com/v1/public/characters';
  private ts: string = '&ts=manu';
  private apiKeyHash: string = '&apikey=82bc94f16950d88920041a81f944111c&hash=f925eb16c351b8b9d640d50a1f57eb7a';
  private idUrl: string = '?ts=manu&apikey=82bc94f16950d88920041a81f944111c&hash=f925eb16c351b8b9d640d50a1f57eb7a';


  constructor(private http: HttpClient) {}

  getHeroes(offset: number): Observable<Results[]> {
    return this.http
      .get<Hero>(this.apiUrl +this.idUrl + '&offset=' + offset)
      .pipe(map((data: Hero) => data.data.results));
  }

  getHeroesRandom(): Observable<Results[]> {
    return this.http
      .get<Hero>(
        this.apiUrl + this.idUrl +
          '&offset=' +
          Math.floor(Math.random() * 1562) +
          '&limit=' +
          12
      )
      .pipe(map((data: Hero) => data.data.results));
  }

  getHeroesById(id: number): Observable<Results[]> {
    return this.http
      .get<Hero>(this.apiUrl + '/' + id + this.idUrl)
      .pipe(map((result: Hero) => result.data.results));
  }

  getSearchHero(name: string): Observable<Results[]> {
    if (!name.trim()) {
      return of([]);
    }
    return this.http
    //&nameStartsWith= nombre que empieza con + nombre que quieras
      .get<Hero>(this.apiUrl + '?nameStartsWith=' + name + this.ts + this.apiKeyHash)
      .pipe(map((result: Hero) => result.data.results));
  }


}

