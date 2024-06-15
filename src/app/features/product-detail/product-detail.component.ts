import {
  Component,
  OnInit,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { CommonModule } from '@angular/common';
import { TruncateStringPipe } from '../../shared/pipes/truncate-string.pipe';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';
import { CartService } from '../../shared/services/cart.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    TruncateStringPipe,
    ContactUsComponent,
    SpinnerComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  product$ = this.productsService.productById$;
  isLoading$ = this.cartService.isLoading$;
  isCartAdded$ = this.cartService.isCartAdded$;
  addedProduct$ = this.cartService.addedProduct$;

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe(() => {
        this.isCartAdded$.next(false);
      });

    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productsService.getProductById(id);
    });
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  onAddtoCart(id: string) {
    this.isLoading$.next(true);
    this.cartService.addToCart(id, 1);
    this.isLoading$.next(false);
    if (this.isCartAdded$.value == true && this.isLoading$.value == false) {
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
    } else {
    }
  }
}
