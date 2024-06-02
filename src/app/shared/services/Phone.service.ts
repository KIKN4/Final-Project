import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetApiResponse } from '../types/apiProduct';

@Injectable({ providedIn: 'root' })
export class PhoneService {
  baseUrl =
    'https://api.everrest.educata.dev/shop/products/category/2?page_index=1&page_size=50';

  constructor(private http: HttpClient) {}

  getPhones() {
    return this.http.get<GetApiResponse>(`${this.baseUrl}`);
  }
}
