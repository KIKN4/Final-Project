import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { ProductsService } from '../../shared/services/products.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  cart$ = this.cartService.cart$;

  ngOnInit(): void {
    this.cartService.getCart();
  }
}
