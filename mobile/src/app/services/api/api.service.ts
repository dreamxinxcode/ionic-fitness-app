import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,   
  ) { }

  get(url: string, params?: any): Observable<any> {
    return this.http.get(`${this.config.API_URL}/${url}/`, params);
  }

  post(url: string, data:any): Observable<any> {
    return this.http.post(`${this.config.API_URL}/${url}/`, data);
  }

  delete(url: string): Observable<any> {
    return this.http.delete(`${this.config.API_URL}/${url}/`);
  }
}
