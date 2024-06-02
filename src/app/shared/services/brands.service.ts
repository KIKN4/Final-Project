import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BrandsService {
  baseUrl = 'https://api.everrest.educata.dev/shop/products/brands';

  constructor(private http: HttpClient) {}

  getBrands() {
    return this.http.get<any>(`${this.baseUrl}`);
  }
}
