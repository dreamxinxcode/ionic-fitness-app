import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private config: ConfigService,
  ) { }

  syncWorkouts(): Observable<any> {
    return this.http.get(this.config.API_URL + '/workouts/');
  }

  workoutsForUser(id: number): Observable<any> {
    return this.api.get('workouts/for_user/' + `${id}`);
  }

  saveAsTempalte(schema): Observable<any> {
    return this.http.post(this.config.API_URL + '', { schema });
  }
}
