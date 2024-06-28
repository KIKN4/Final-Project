import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { ENVIRONMENT } from '../environments/environment';
import { CartProductDetails, ProductDetails } from '../types/apiProduct';
import { Cart } from '../types/cart';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';

export interface AddedProduct {
  title: string;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly env = inject(ENVIRONMENT);
  private readonly baseUrl = `${this.env.apiURL}/shop/cart`;
  private readonly productsUrl = `${this.env.apiURL}/shop/products`;
  private readonly activatedRoute = inject(ActivatedRoute);

  cart$ = new BehaviorSubject<CartProductDetails[] | null>(null);
  errors$ = new BehaviorSubject<HttpErrorResponse | null>(null);
  isLoading$ = new BehaviorSubject<boolean>(false);
  isCartAdded$ = new BehaviorSubject<boolean>(false);
  addedProduct$ = new BehaviorSubject<AddedProduct | null>(null);

  get authHeaders() {
    return new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.authService.accessToken}`,
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.accessToken}`,
    });
  }

  private handleError(error: HttpErrorResponse) {
    this.errors$.next(error.error);
  }

  getCart() {
    this.isLoading$.next(true);
    this.httpClient
      .get<Cart>(this.baseUrl, { headers: this.authHeaders })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          this.isLoading$.next(false);
          return EMPTY;
        }),
        switchMap((cart) => {
          const itemRequests = cart.products.map((cartProduct) =>
            this.httpClient
              .get<ProductDetails>(
                `${this.productsUrl}/id/${cartProduct.productId}`,
              )
              .pipe(
                map((individualProduct) => ({
                  ...individualProduct,
                  quantity: cartProduct.quantity,
                  pricePerQuantity: cartProduct.pricePerQuantity,
                  beforeDiscountPrice: cartProduct.beforeDiscountPrice,
                })),
              ),
          );
          if (cart._id && cart.products.length === 0) {
            return of([]);
          }
          return forkJoin(itemRequests);
        }),
      )
      .subscribe((cart) => {
        this.isLoading$.next(false);
        if (cart) {
          this.cart$.next(cart);
        } else {
          this.cart$.next([]);
        }
      });
  }

  addToCart(id: string, quantity: number) {
    this.isLoading$.next(true);

    this.httpClient
      .get<ProductDetails>(`${this.productsUrl}/id/${id}`, {
        headers: this.authHeaders,
      })
      .pipe(
        tap((productDetails) => {
          this.addedProduct$.next({
            title: productDetails.title,
            stock: productDetails.stock,
          });
        }),
        switchMap(() => {
          const cartAction$ = this.cart$.value
            ? this.httpClient.patch<Cart>(
                `${this.baseUrl}/product`,
                { id, quantity },
                { headers: this.authHeaders },
              )
            : this.httpClient.post<Cart>(
                `${this.baseUrl}/product`,
                { id, quantity },
                { headers: this.authHeaders },
              );

          return cartAction$;
        }),
        tap((cart) => {
          this.isLoading$.next(false);
          this.isCartAdded$.next(true);
          this.getCart();
        }),
      )
      .subscribe(() => {
        this.isLoading$.next(false);
        this.isCartAdded$.next(true);
        this.activatedRoute.queryParams.subscribe(() => {
          window.scrollTo(0, 0);
        });
        this.activatedRoute.params.subscribe(() => {
          window.scrollTo(0, 0);
        });
        this.activatedRoute.data.subscribe(() => {
          window.scrollTo(0, 0);
        });
        this.activatedRoute.paramMap.subscribe(() => {
          window.scrollTo(0, 0);
        });
        this.isCartAdded$.next(false);
        this.getCart();
      });
  }

  deleteProduct(id: string): Observable<any> {
    this.isLoading$.next(true);
    const url = `${this.baseUrl}/product`;
    const headers = this.getHeaders();
    const body = { id: id };

    return this.httpClient.delete(url, { headers, body: { id } }).pipe(
      catchError(() => {
        this.isLoading$.next(false);
        return EMPTY;
      }),
      map((response) => {
        this.isLoading$.next(false);
        return response;
      }),
    );
  }
}
