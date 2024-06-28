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
import { TypeofCategory } from '../types/categoryType';

export interface ProductState {
  loading: boolean;
  data: ProductDetails[];
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private httpClient = inject(HttpClient);
  private env = inject(ENVIRONMENT);
  private baseUrl = `${this.env.apiURL}/shop/products`;
  private allCategoryUrl = `${this.env.apiURL}/shop/products/categories`;
  private categoryByUrl = `${this.env.apiURL}/shop/products/category`;

  products$ = new BehaviorSubject<ApiProduct[]>([]);
  productById$ = new BehaviorSubject<ProductDetails | null>(null);
  categories$ = new BehaviorSubject<TypeofCategory[]>([]);
  phones$ = new BehaviorSubject<ApiProduct[]>([]);
  laptops$ = new BehaviorSubject<ApiProduct[]>([]);

  getProductById(id: string | null) {
    return this.httpClient
      .get<ProductDetails>(`${this.baseUrl}/id/${id}`)
      .subscribe((response) => {
        this.productById$.next(response);
      });
  }

  getCategoryById(id: string | null, query: ProductQuery) {
    if (id) {
      return this.httpClient.get<GetApiResponse>(
        `${this.baseUrl}/search?&category_id=${id}`,
        {
          params: {
            ...query,
          },
        },
      );
    } else {
      return this.httpClient.get<GetApiResponse>(`${this.baseUrl}/search`, {
        params: {
          ...query,
        },
      });
    }
  }

  getCategorys() {
    return this.httpClient
      .get<TypeofCategory[]>(`${this.allCategoryUrl}`)
      .subscribe((response) => {
        this.categories$.next(response);
      });
  }

  getByCategory(page_index: number, page_size: number, categoryId: number) {
    return this.httpClient
      .get<GetApiResponse>(`${this.categoryByUrl}/${categoryId}`, {
        params: { page_index, page_size },
      })
      .subscribe((response) => {
        categoryId === 1
          ? this.laptops$.next(response.products)
          : this.phones$.next(response.products);
      });
  }

  getAllProduct(query: ProductQuery) {
    return this.httpClient
      .get<GetApiResponse>(`${this.baseUrl}/search`, {
        params: { ...query },
      })
      .subscribe((response) => {
        this.products$.next(response.products);
      });
  }
}
