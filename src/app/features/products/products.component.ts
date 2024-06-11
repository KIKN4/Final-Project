import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { ApiProduct } from '../../shared/types/apiProduct';
import { SortDirection, SortProductBy } from '../../shared/types/productQuery';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  product: ApiProduct[] | null = null;

  ngOnInit(): void {
    // this.activatedRoute.queryParamMap.subscribe((query) => {
    //   // for http request with query
    //   let baseParams = {
    //     keywords: query.get('keywords'),
    //     page_size: 40,
    //     page_index: 1,
    //     sort_by: query.get('sort_By') as SortProductBy,
    //     sort_direction: query.get('sort_Direction') as SortDirection,
    //     price_min: Number(query.get('minPrice')),
    //     price_max: Number(query.get('maxPrice')),
    //   };
    //   const querys = Object.fromEntries(
    //     Object.entries(baseParams).filter(
    //       ([_, value]: any) => value !== '' && value !== 0 && value !== null
    //     )
    //   );
    //   this.activatedRoute.paramMap.subscribe((params) => {
    //     const id = params.get('id');
    //     this.productsService
    //       .getCategoryById(id, querys)
    //       .subscribe((response) => {
    //         this.product = response.products;
    //       });
    //   });
    // });
  }
}
