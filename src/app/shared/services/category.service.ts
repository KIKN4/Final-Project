import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiProduct, GetApiResponse } from '../types/apiProduct';
import { ENVIRONMENT } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PhoAndLapService {
  private httpClient = inject(HttpClient);
  private env = inject(ENVIRONMENT);
  private baseUrl = `${this.env.apiURL}/shop/products/category`;

  phones$ = new BehaviorSubject<ApiProduct[]>([]);
  laptops$ = new BehaviorSubject<ApiProduct[]>([]);

  getPhones(page_index = 1, page_size = 50) {
    return this.httpClient
      .get<GetApiResponse>(`${this.baseUrl}/2`, {
        params: { page_index, page_size },
      })
      .subscribe((response) => {
        this.phones$.next(response.products);
      });
  }

  getLaptops(page_index = 1, page_size = 10) {
    return this.httpClient
      .get<GetApiResponse>(`${this.baseUrl}/1`, {
        params: { page_index, page_size },
      })
      .subscribe((response) => {
        this.laptops$.next(response.products);
      });
  }
}
