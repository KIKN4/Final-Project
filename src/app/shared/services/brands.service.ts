import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BrandsService {
  private httpClient = inject(HttpClient);
  private env = inject(ENVIRONMENT);

  baseUrl = `${this.env.apiURL}/shop/products/brands`;
  brands$ = new BehaviorSubject<string[]>([]);

  getBrands() {
    return this.httpClient
      .get<string[]>(`${this.baseUrl}`)
      .subscribe((response) => {
        this.brands$.next(response);
      });
  }
}
