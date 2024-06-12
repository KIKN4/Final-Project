import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { PriceRangeComponent } from '../../shared/components/price-range/price-range.component';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';
import { ProductsService } from '../../shared/services/products.service';
import { ApiProduct } from '../../shared/types/apiProduct';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TruncateStringPipe } from '../../shared/pipes/truncate-string.pipe';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BrandsService } from '../../shared/services/brands.service';
import { DropdownFilterComponent } from '../../shared/components/dropdown-filter/dropdown-filter.component';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PriceRangeComponent,
    ContactUsComponent,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    TruncateStringPipe,
    DropdownFilterComponent,
    RouterLinkActive,
  ],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css',
})
export class ProductsByCategoryComponent implements OnInit, AfterViewInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly fb = inject(FormBuilder);
  private brandsService = inject(BrandsService);
  private priceGap = 1000;
  private minPriceValue!: number;
  private maxPriceValue!: number;

  products: ApiProduct[] | null = null;
  brands$ = this.brandsService.brands$;

  checkCategory!: boolean;
  allCategory = false;
  allProducts!: string;

  sortByArr = ['price', 'rating', 'issue_date'];
  sortByDir = ['asc', 'desc'];

  filterForm = this.fb.group({
    category_id: '',
    keywords: '',
    sort_by: '',
    sort_direction: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
  });

  get controls() {
    return this.filterForm.controls;
  }

  selectedFn(id: string) {
    if (id === '1') {
      this.allProducts = '1';
    } else if (id === '2') {
      this.allProducts = '2';
    } else {
      this.allProducts = '';
    }
  }

  selectCaregory(category_id: string) {
    this.filterForm.patchValue({ category_id });
  }

  selectSortBy(sort_by: string) {
    this.filterForm.patchValue({ sort_by });
  }

  selectSortDir(sort_direction: string) {
    this.filterForm.patchValue({ sort_direction });
  }

  selectBrand(brand: string) {
    this.filterForm.patchValue({ brand });
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.router.navigate([], {
          queryParams: {
            keywords: this.filterForm.value.keywords || null,
            sort_by: this.filterForm.value.sort_by || null,
            sort_direction: this.filterForm.value.sort_direction || null,
            brand: this.filterForm.value.brand || null,
            minPrice: this.filterForm.value.minPrice || null,
            maxPrice: this.filterForm.value.maxPrice || null,
          },
        });
      });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.filterForm.setValue({
        category_id: params['category_id'] || null,
        keywords: params['keywords'] || null,
        sort_by: params['sort_by'] || null,
        sort_direction: params['sort_direction'] || null,
        brand: params['brand'] || null,
        minPrice: params['minPrice'] || 1,
        maxPrice: params['maxPrice'] || 10000,
      });
    });
    this.activatedRoute.queryParamMap.subscribe((query) => {
      //  get query params
      let baseParams = {
        keywords: query.get('keywords'),
        page_size: 40,
        page_index: 1,
        sort_by: query.get('sort_by'),
        sort_direction: query.get('sort_direction'),
        brand: query.get('brand'),
        price_min: Number(query.get('minPrice')),
        price_max: Number(query.get('maxPrice')),
      };
      const querys = Object.fromEntries(
        Object.entries(baseParams).filter(
          ([_, value]: any) => value !== '' && value !== 0 && value !== null
        )
      );

      this.activatedRoute.paramMap.subscribe((params) => {
        // for http request with category and querys
        let id = params.get('id');
        if (id) {
          id === '1'
            ? (this.checkCategory = true)
            : (this.checkCategory = false);
        } else {
          this.allCategory = !this.allCategory;
        }

        this.productsService
          .getCategoryById(id, querys)
          .subscribe((response) => {
            this.products = response.products;
          });
      });
    });
  }

  // for price filter

  ngAfterViewInit() {
    const rangeInputs = document.querySelectorAll(
      '.range-input input'
    ) as NodeListOf<HTMLInputElement>;
    const priceInputs = document.querySelectorAll(
      '.price-input input'
    ) as NodeListOf<HTMLInputElement>;
    const progress = document.querySelector('.slider .progress') as HTMLElement;

    const updateSlider = () => {
      let minVal = parseInt(rangeInputs[0].value);
      let maxVal = parseInt(rangeInputs[1].value);

      if (maxVal - minVal >= this.priceGap) {
        priceInputs[0].value = minVal.toString();
        priceInputs[1].value = maxVal.toString();
        progress.style.left =
          (minVal / parseInt(rangeInputs[0].max)) * 100 + '%';
        progress.style.right =
          100 - (maxVal / parseInt(rangeInputs[1].max)) * 100 + '%';
      }
    };

    rangeInputs.forEach((input) => {
      input.addEventListener('input', () => {
        let minVal = parseInt(rangeInputs[0].value);
        let maxVal = parseInt(rangeInputs[1].value);

        if (maxVal - minVal < this.priceGap) {
          if (input === rangeInputs[0]) {
            rangeInputs[0].value = (maxVal - this.priceGap).toString();
          } else {
            rangeInputs[1].value = (minVal + this.priceGap).toString();
          }
        }
        this.minPriceValue = parseInt(rangeInputs[0].value);
        this.maxPriceValue = parseInt(rangeInputs[1].value);
        updateSlider();
      });
    });

    priceInputs.forEach((input) => {
      input.addEventListener('input', () => {
        let minVal = parseInt(priceInputs[0].value);
        let maxVal = parseInt(priceInputs[1].value);

        if (
          maxVal - minVal >= this.priceGap &&
          minVal >= 0 &&
          maxVal <= parseInt(rangeInputs[0].max)
        ) {
          rangeInputs[0].value = minVal.toString();
          rangeInputs[1].value = maxVal.toString();
          this.minPriceValue = minVal;
          this.maxPriceValue = maxVal;
          updateSlider();
        }
      });
    });

    updateSlider();
  }
}
