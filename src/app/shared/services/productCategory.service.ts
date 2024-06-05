import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypeofCategory } from '../types/categoryType';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly httpClient = inject(HttpClient);

  baseUrl = 'https://api.everrest.educata.dev/shop/products/categories';

  getCategorys() {
    return this.httpClient.get<TypeofCategory[]>(`${this.baseUrl}`);
  }
}
