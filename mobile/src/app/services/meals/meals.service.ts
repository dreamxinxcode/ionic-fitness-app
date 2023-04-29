import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  syncMeals(): Observable<any> {
    return this.http.get(this.config.API_URL + '/meals/');
  }

  syncMealTags(): Observable<any> {
    return this.http.get(this.config.API_URL + '/meals/tags/');
  } 

  query(query: string): Observable<any> {
    console.log(query)
    return this.http.get(this.config.API_URL + `/meals/?query=${query}`);
  }

  filterByTags(tags): Observable<any> {
    const params = tags.join(); 
    return this.http.get(`${this.config.API_URL}/meals/filter_by_tags/?q=${params}/`);
  }
}
