import {
  Component,
  OnInit,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { ProductDetails } from '../../shared/types/apiProduct';
import { CommonModule } from '@angular/common';
import { TruncateStringPipe } from '../../shared/pipes/truncate-string.pipe';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    TruncateStringPipe,
    ContactUsComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  product$ = this.productsService.productById$;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productsService.getProductById(id);
    });
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
