import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Cart } from '../types/cart';
import { BehaviorSubject, EMPTY, catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly hhtpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly env = inject(ENVIRONMENT);
  private readonly baseUrl = `${this.env.apiURL}/shop/cart`;
  cart$ = new BehaviorSubject<Cart | null>(null);

  get authHeaders() {
    return new HttpHeaders({
      accept: 'aplication/json',
      Authorization: `Bearer ${this.authService.accessToken}`,
    });
  }

  getCart() {
    this.hhtpClient
      .get<Cart>(this.baseUrl, { headers: this.authHeaders })
      .pipe(catchError(() => EMPTY))
      .subscribe((cart) => this.cart$.next(cart));
  }

  addToCart(id: string, quantity: number) {
    if (this.cart$.value) {
      this.hhtpClient
        .patch<Cart>(
          `${this.baseUrl}/product`,
          { id, quantity },
          { headers: this.authHeaders }
        )
        .subscribe((cart) => {
          this.cart$.next(cart);
        });
    } else {
      this.hhtpClient
        .post<Cart>(
          `${this.baseUrl}/product`,
          { id, quantity },
          { headers: this.authHeaders }
        )
        .subscribe((cart) => {
          this.cart$.next(cart);
        });
    }
  }
}
