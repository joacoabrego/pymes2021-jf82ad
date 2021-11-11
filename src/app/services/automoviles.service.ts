import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Automovil } from '../models/automovil';
@Injectable({ provideIn: 'root' })
export class AutomovilesService {
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://pav2.azurewebsites.net/api/Automoviles';
  }
  get() {
    return this.httpClient.get(this.resourceUrl);
  }
  post(obj: Automovil) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
}
