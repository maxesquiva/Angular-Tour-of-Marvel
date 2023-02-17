import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero, Results } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  // search(term: string): any {
  //   throw new Error('Method not implemented.');
  // }
  // private heroesUrl = 'api/heroes';
  private apiUrl: string ='https://gateway.marvel.com/v1/public/characters';
  private ts: string = '&ts=manu';
  private apiKeyHash: string = '&apikey=82bc94f16950d88920041a81f944111c&hash=f925eb16c351b8b9d640d50a1f57eb7a';
  private idUrl: string = '?ts=manu&apikey=82bc94f16950d88920041a81f944111c&hash=f925eb16c351b8b9d640d50a1f57eb7a';

  // heroes: any = [];

  // private url: string = 'https://gateway.marvel.com/v1/public/characters';
  // private hash: string = '&hash=f925eb16c351b8b9d640d50a1f57eb7a';
  // private idUrl = this.heroesUrl+'/data/results';

  //TODO dejar de usar any
  constructor(private http: HttpClient) {}
  //offset para determinar por donde empizan a mostrar heroes
  getHeroes(offset: number): Observable<Results[]> {
    return this.http
      .get<Hero>(this.apiUrl +this.idUrl + '&offset=' + offset)
      .pipe(map((data: Hero) => data.data.results));
  }

  getHeroesRandom(): Observable<Results[]> {
    //TODO toocar numero de heros que quede mejor a la hora de darle estilo
    // limit muetra el maximo por pantlla

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
    return this.http
    //&nameStartsWith= nombre que empieza con + nombre que quieras
      .get<Hero>(this.apiUrl + '?nameStartsWith=' + name + this.ts + this.apiKeyHash)
      .pipe(map((result: Hero) => result.data.results));
  }


  // buscarHeroes(termino: string): Hero[] {
  //   const heroesArr: Hero[] = [];
  //   termino = termino.toLowerCase();

  //   for (let i = 0; i < this.heroes.length; i++) {

  //     const heroe = this.heroes[i];
  //     const nombre = heroe.nombre.toLowerCase();
  //     if (nombre.indexOf(termino) >= 0) {
  //       heroe.idx = i;
  //       heroesArr.push(heroe);
  //     }
  //   }

  //   return heroesArr;
  // }

}

// private handleError<T>(operation = 'operation', result?: T){
//   return (error:any): Observable<T> => {
//     console.error(error);
//     this.log(`${operation} failed: ${error.message}`);
//     return of(result as T);
//   };
// }

// getHero(id: number): Observable<Hero> {
//   // const url = `${this.heroesUrl}/${id}`;
//   // const url = `${this.heroesUrl}/${id}`;
//   return this.http.get<Hero>(this.heroesUrl).pipe(
//     tap(_=>this.log(`fetched hero id=${id}`))
//   );
// }

// updateHero(hero: Hero): Observable<any> {
//   return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
//     tap(_=>this.log(`updated hero id=${hero.id}`)),
//     catchError(this.handleError<any>('updateHero'))
//   );
// }

// httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'applicatiopn/json'})
// };

// addHero(hero: Hero): Observable<Hero> {
//   return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
//     tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
//     catchError(this.handleError<Hero>('addHero'))
//   );
// }
// deleteHero(id: number): Observable<Hero> {
//   const url = `${this.heroesUrl}/${id}`;

//   return this.http.delete<Hero>(url, this.httpOptions).pipe(
//     tap(_ => this.log(`deleted hero id=${id}`)),
//     catchError(this.handleError<Hero>('deleteHero'))
//   );
// }
// searchHeroes(term: string): Observable<Hero[]> {
//   if(!term.trim()){
//     return of ([]);
//   }
//   return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
//     tap(x => x.length ?
//       this.log(`found heroes matching "${term}"`) :
//       this.log(`no heroes matching"${term}"`)),
//     catchError(this.handleError<Hero[]>('searchHeroes', []))
//   );
// }
// }
