import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { TruncateStringPipe } from '../../pipes/truncate-string.pipe';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    DropdownItemComponent,
    TruncateStringPipe,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly brandsService = inject(BrandsService);

  categories$ = this.productsService.categories$;
  brands$ = this.brandsService.brands$;
  phones$ = this.productsService.phones$;
  laptops$ = this.productsService.laptops$;

  ngOnInit() {
    this.productsService.getCategorys();
    this.productsService.getByCategory(1, 10, 1);
    this.productsService.getByCategory(1, 10, 2);
    this.brandsService.getBrands();
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
