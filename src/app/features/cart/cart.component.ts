import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { ProductsService } from '../../shared/services/products.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BehaviorSubject, filter, map, tap } from 'rxjs';
import { ProductDetails } from '../../shared/types/apiProduct';
import { TruncateStringPipe } from '../../shared/pipes/truncate-string.pipe';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    RouterLink,
    TruncateStringPipe,
    CommonModule,
    ContactUsComponent,
    SpinnerComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  readonly isLoading$ = this.cartService.isLoading$;

  cart$ = this.cartService.cart$;
  product$ = this.productsService.productById$;
  totalCost$ = new BehaviorSubject<number | null>(null);

  ngOnInit(): void {
    this.cartService.getCart();
    this.cart$
      .pipe(
        filter(
          (products: ProductDetails[] | null): products is ProductDetails[] => {
            const hasProducts = products !== null && products.length > 0;
            if (!hasProducts) this.totalCost$.next(0);
            return hasProducts;
          }
        ),
        map((products: ProductDetails[]) =>
          products.map((product: ProductDetails) => product.price.current)
        ),
        map((prices: number[]) =>
          prices.reduce((acc: number, price: number) => acc + price, 0)
        ),
        tap((total: number) => this.totalCost$.next(total))
      )
      .subscribe();
  }

  onDeleteProduct(id: string) {
    this.cartService.deleteProduct(id).subscribe(
      (response) => {
        this.cartService.getCart();
      },
      (error) => {
        console.error('error', console.error());
      }
    );
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
