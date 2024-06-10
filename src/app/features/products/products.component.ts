import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { ApiProduct } from '../../shared/types/apiProduct';

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
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productsService.getCategoryById(id).subscribe((response) => {
        this.product = response.products;
      });
    });
  }
}
