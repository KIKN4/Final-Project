import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PhoneService } from '../../services/Phone.service';
import { ApiProduct } from '../../types/apiProduct';
import { CategoryService } from '../../services/productCategory.service';
import { TypeofCategory } from '../../types/categoryType';
import { LaptopService } from '../../services/laptop.service';
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
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  categories: TypeofCategory[] = [];
  brands: string[] = [];
  phones: ApiProduct[] = [];
  laptops: ApiProduct[] = [];

  private categoryService = inject(CategoryService);
  private brandsService = inject(BrandsService);
  private phoneService = inject(PhoneService);
  private laptopService = inject(LaptopService);

  ngOnInit() {
    this.phoneService.getPhones().subscribe((response) => {
      this.phones = response.products;
    });
    this.categoryService.getCategorys().subscribe((response) => {
      this.categories = response;
    });
    this.laptopService.getLaptops().subscribe((response) => {
      this.laptops = response.products;
    });
    this.brandsService.getBrands().subscribe((response) => {
      this.brands = response;
    });
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
