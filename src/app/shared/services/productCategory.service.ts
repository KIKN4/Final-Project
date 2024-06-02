import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypeofCategory } from '../types/categoryType';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  baseUrl = 'https://api.everrest.educata.dev/shop/products/categories';

  constructor(private http: HttpClient) {}

  getCategorys() {
    return this.http.get<TypeofCategory[]>(`${this.baseUrl}`);
  }
}
