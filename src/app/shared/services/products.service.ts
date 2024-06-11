import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '../environments/environment';
import {
  ApiProduct,
  GetApiResponse,
  ProductDetails,
} from '../types/apiProduct';
import { ProductQuery } from '../types/productQuery';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private httpClient = inject(HttpClient);
  private env = inject(ENVIRONMENT);
  private baseUrl = `${this.env.apiURL}/shop/products`;
  products$ = new BehaviorSubject<ApiProduct[]>([]);

  getAllProduct(query: ProductQuery) {
    return this.httpClient
      .get<GetApiResponse>(`${this.baseUrl}/search`, {
        params: { ...query },
      })
      .subscribe((response) => {
        this.products$.next(response.products);
      });
  }

  getProductById(id: string | null) {
    return this.httpClient.get<ProductDetails>(`${this.baseUrl}/id/${id}`);
  }

  getCategoryById(id: string | null, query: ProductQuery) {
    if (id) {
      return this.httpClient.get<GetApiResponse>(
        `${this.baseUrl}/search?&category_id=${id}`,
        {
          params: {
            ...query,
          },
        }
      );
    } else {
      return this.httpClient.get<GetApiResponse>(`${this.baseUrl}/search`, {
        params: {
          ...query,
        },
      });
    }
  }
}
