import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Automovil } from '../models/automovil';
@Injectable({ providedIn: 'root' })
export class AutomovilesService {
  resourceUrl: string;
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
