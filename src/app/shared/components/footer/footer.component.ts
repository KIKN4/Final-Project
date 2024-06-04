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
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';

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
  phones: ApiProduct[] = [];
  laptops: ApiProduct[] = [];
  categories: TypeofCategory[] = [];
  brands: string[] = [];

  private phoneService = inject(PhoneService);
  private laptopService = inject(LaptopService);
  private categoryService = inject(CategoryService);
  private brandsService = inject(BrandsService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

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

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
      this.activatedRoute.queryParams.subscribe(() => {
        window.scrollTo(0, 0);
      });
      this.activatedRoute.params.subscribe(() => {
        window.scrollTo(0, 0);
      });
      this.activatedRoute.data.subscribe(() => {
        window.scrollTo(0, 0);
      });
    });
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
