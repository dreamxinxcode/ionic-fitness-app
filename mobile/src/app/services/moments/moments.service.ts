import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class MomentsService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  syncMoments(): Observable<any> {
    return this.http.get(this.config.API_URL + '/moments/');
  }

  query(query: string): Observable<any> {
    return this.http.get(this.config.API_URL + `/moments/?query=${query}`);
  }
}
