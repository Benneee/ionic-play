import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode',
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  moviesUrl = `https://www.omdbapi.com/?apikey=fd11eabe`;

  constructor(private httpClient: HttpClient) {}

  searchData(title: string, type: SearchType): Observable<any> {
    return this.httpClient
      .get(`${this.moviesUrl}&s=${encodeURI(title)}&type=${type}`)
      .pipe(
        map((results) => {
          // console.log('res: ', results);
          return results['Search'];
        }),
      );
  }

  getDetails(id: any) {
    return this.httpClient.get(`${this.moviesUrl}&i=${id}&plot=full`);
  }
}
