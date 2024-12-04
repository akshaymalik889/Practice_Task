import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../entities/movie';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private api = "http://universities.hipolabs.com/search?name=middle";


  constructor(private http: HttpClient) { }

  fetchData():Observable<Movie[]>
  {
    return this.http.get<Movie[]>(this.api);
  }

  
}
