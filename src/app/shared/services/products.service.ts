import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '../environments/environment';
import { GetApiResponse, ProductDetails } from '../types/apiProduct';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private httpClient = inject(HttpClient);
  private env = inject(ENVIRONMENT);
  private baseUrl = `${this.env.apiURL}/shop/products`;

  getProductById(id: string | null) {
    return this.httpClient.get<ProductDetails>(`${this.baseUrl}/id/${id}`);
  }

  getCategoryById(id: string | null) {
    return this.httpClient.get<GetApiResponse>(
      `${this.baseUrl}/category/${id}?page_index=1&page_size=30`
    );
  }
}
