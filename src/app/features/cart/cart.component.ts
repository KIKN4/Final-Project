import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { ProductsService } from '../../shared/services/products.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';
import { ProductDetails } from '../../shared/types/apiProduct';
import { TruncateStringPipe } from '../../shared/pipes/truncate-string.pipe';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { CartProductDetails } from '../../shared/types/cart';

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
export class CartComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  readonly isLoading$ = this.cartService.isLoading$;

  errorMessage$ = this.cartService.errors$;
  cart$ = this.cartService.cart$;
  product$ = this.productsService.productById$;

  totalcost$ = this.cart$.pipe(
    filter((products): products is CartProductDetails[] => products !== null),
    map((products: CartProductDetails[]) => {
      if (products.length) {
        return products
          .map((product: CartProductDetails) => product.price.current)
          .reduce((acc: number, price: number) => acc + price, 0);
      }
      return 0;
    }),
  );
  ngOnInit(): void {
    this.cartService.getCart();
  }

  floorPrice(price: number): number {
    return Math.floor(price * 2.7);
  }

  onDeleteProduct(id: string) {
    this.cartService.deleteProduct(id).subscribe(
      (response) => {
        this.cartService.getCart();
      },
      (error) => {
        console.error('error', console.error());
      },
    );
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
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
