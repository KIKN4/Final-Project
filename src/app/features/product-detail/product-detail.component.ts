import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { ProductDetails } from '../../shared/types/apiProduct';
import { CommonModule } from '@angular/common';
import { TruncateStringPipe } from '../../shared/pipes/truncate-string.pipe';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, TruncateStringPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  product: ProductDetails | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productsService.getProductById(id).subscribe((response) => {
        this.product = response;
      });
    });
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
