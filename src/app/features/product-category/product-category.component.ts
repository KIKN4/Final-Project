import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PriceRangeComponent } from '../../shared/components/price-range/price-range.component';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';
import { ProductsService } from '../../shared/services/products.service';
import { ApiProduct } from '../../shared/types/apiProduct';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TruncateStringPipe } from '../../shared/pipes/truncate-string.pipe';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [
    RouterLink,
    PriceRangeComponent,
    ContactUsComponent,
    FormsModule,
    AsyncPipe,
    TruncateStringPipe,
  ],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css',
})
export class ProductsByCategoryComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  checkCategory = true;
  isRotated = false;

  get arrowClass() {
    return this.isRotated
      ? 'fa-solid fa-chevron-down rotate'
      : 'fa-solid fa-chevron-down';
  }

  products: ApiProduct[] | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productsService.getCategoryById(id).subscribe((response) => {
        this.products = response.products;
        id == '1'
          ? (this.checkCategory = true)
          : (this.checkCategory = !this.checkCategory);
      });
    });
  }

  toggleRotation() {
    this.isRotated = !this.isRotated;
  }
}
