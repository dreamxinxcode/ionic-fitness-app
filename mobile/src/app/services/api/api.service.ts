import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,   
  ) { }

  get(url: string) {
    return this.http.get(`${this.config.API_URL}/${url}/`);
  }

  post(url: string, data:any) {
    return this.http.post(`${this.config.API_URL}/${url}/`, data);
  }

  delete(url: string) {
    return this.http.delete(`${this.config.API_URL}/${url}/`);
  }
}
