import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { ApiProduct } from '../../shared/types/apiProduct';
import { SortDirection, SortProductBy } from '../../shared/types/productQuery';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandsService } from '../../shared/services/brands.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';
import { TruncateStringPipe } from '../../shared/pipes/truncate-string.pipe';
import { DropdownFilterComponent } from '../../shared/components/dropdown-filter/dropdown-filter.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ContactUsComponent,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    TruncateStringPipe,
    DropdownFilterComponent,
    RouterLinkActive,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, AfterViewInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly productsService = inject(ProductsService);
  private readonly brandsService = inject(BrandsService);
  private readonly cartService = inject(CartService);
  private priceGap = 1000;
  private minPriceValue!: number;
  private maxPriceValue!: number;

  allProduct$ = this.productsService.products$;
  brands$ = this.brandsService.brands$;

  isCartAdded$ = this.cartService.isCartAdded$;
  isLoading$ = this.cartService.isLoading$;
  addedProduct$ = this.cartService.addedProduct$;
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
      .subscribe(() => {
        this.router.navigate([], {
          queryParams: {
            category_id: this.filterForm.value.category_id || null,
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
        minPrice: params['minPrice'] || '1',
        maxPrice: params['maxPrice'] || '10000',
      });
    });

    this.activatedRoute.queryParamMap.subscribe((query) => {
      let baseParams = {
        category_id: query.get('category_id'),
        keywords: query.get('keywords'),
        page_size: 40,
        page_index: 1,
        sort_by: query.get('sort_by') as SortProductBy,
        sort_direction: query.get('sort_direction') as SortDirection,
        price_min: Number(query.get('minPrice')),
        price_max: Number(query.get('maxPrice')),
        brand: query.get('brand'),
      };

      const querys = Object.fromEntries(
        Object.entries(baseParams).filter(
          ([_, value]: any) => value !== '' && value !== 0 && value !== null
        )
      );

      this.productsService.getAllProduct(querys);
    });
  }

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

  onAddtoCart(id: string) {
    this.cartService.addToCart(id, 1);
    if (this.isCartAdded$) {
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
