import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PhoAndLapService } from '../../services/category.service';
import { CategoryService } from '../../services/productCategory.service';
import { BrandsService } from '../../services/brands.service';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { TruncateStringPipe } from '../../pipes/truncate-string.pipe';
import { RouterLink } from '@angular/router';

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
  private categoryService = inject(CategoryService);
  private brandsService = inject(BrandsService);
  private phoneService = inject(PhoAndLapService);
  private laptopService = inject(PhoAndLapService);

  categories$ = this.categoryService.categories$;
  brands$ = this.brandsService.brands$;
  phones$ = this.phoneService.phones$;
  laptops$ = this.laptopService.laptops$;

  ngOnInit() {
    this.categoryService.getCategorys();
    this.phoneService.getPhones();
    this.laptopService.getLaptops();
    this.brandsService.getBrands();
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
