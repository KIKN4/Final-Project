import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
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
export class CartComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  readonly isLoading$ = this.cartService.isLoading$;

  errorMessage$ = this.cartService.errors$;
  cart$ = this.cartService.cart$;
  product$ = this.productsService.productById$;

  // ყველაფერი რაც უნდა იცოდე სტრიმზე (რაზეა დამოკიდებული და როგორ იცვლება) დეკლარაციაშივეა.
  // უბრალოდ სერვისში getCart გაასწორე და გაამარტივე! რაღაც კოშმარი გიწერია იქ.
  totalCost$ = this.cart$.pipe(
    map((products: ProductDetails[]) => {
      if (products && products.length) {
        return products
          .map((product: ProductDetails) => product.price.current)
          .reduce((acc: number, price: number) => acc + price, 0);
      }
      return 0;
    }),
  );

  ngOnInit(): void {
    this.cartService.getCart();
    // ამაზე უკეთესი გზაც არსებობს, *დეკლარაციულად დაწერე!*
    // this.cart$
    //   .pipe(
    //     filter(
    //       (products: ProductDetails[] | null): products is ProductDetails[] => {
    //         const hasProducts = products !== null && products.length > 0;
    //         if (!hasProducts) this.totalCost$.next(0);
    //         return hasProducts;
    //       }
    //     ),
    //     map((products: ProductDetails[]) =>
    //       products.map((product: ProductDetails) => product.price.current)
    //     ),
    //     map((prices: number[]) =>
    //       prices.reduce((acc: number, price: number) => acc + price, 0)
    //     ),
    //     tap((total: number) => this.totalCost$.next(total))
    //   )
    //   .subscribe();
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
