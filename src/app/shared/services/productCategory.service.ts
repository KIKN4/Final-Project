import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypeofCategory } from '../types/categoryType';
import { ENVIRONMENT } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private httpClient = inject(HttpClient);
  private env = inject(ENVIRONMENT);
  private baseUrl = `${this.env.apiURL}/shop/products/categories`;
  categories$ = new BehaviorSubject<TypeofCategory[]>([]);

  getCategorys() {
    return this.httpClient
      .get<TypeofCategory[]>(`${this.baseUrl}`)
      .subscribe((response) => {
        this.categories$.next(response);
      });
  }
}
