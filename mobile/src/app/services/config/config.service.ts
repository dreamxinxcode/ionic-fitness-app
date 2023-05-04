import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  PORT: number = 8000
  // HOST: string = '127.0.0.1'

  ASSETS_URL: string = 'http://localhost:4200/assets/'

  // BASE_URL: string = `http://${this.HOST}:${this.PORT}`;
  // API_URL: string = `http://${this.HOST}:${this.PORT}/api`;

  BASE_URL: string = `http://localhost:${this.PORT}`;
  API_URL: string = `http://localhost:${this.PORT}/api`;

  constructor() { }
}
