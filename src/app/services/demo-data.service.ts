import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoDataService {

  constructor(private readonly http: HttpClient) { }

  getData(url: string) {
    return this.http.get(url);
  }
}
