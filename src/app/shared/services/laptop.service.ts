import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetApiResponse } from '../types/apiProduct';

@Injectable({ providedIn: 'root' })
export class LaptopService {
  baseUrl =
    'https://api.everrest.educata.dev/shop/products/category/1?page_index=1&page_size=10';

  constructor(private http: HttpClient) {}

  getLaptops() {
    return this.http.get<GetApiResponse>(`${this.baseUrl}`);
  }
}
