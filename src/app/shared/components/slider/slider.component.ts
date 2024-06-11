import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { BehaviorSubject } from 'rxjs';
import { ApiProduct } from '../../types/apiProduct';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgOptimizedImage, FormsModule, AsyncPipe],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  products$ = this.productsService.products$;

  ngOnInit(): void {
    let baseParams = {
      page_size: 40,
      page_index: 1,
    };
    const querys = Object.fromEntries(
      Object.entries(baseParams).filter(
        ([_, value]: any) => value !== '' && value !== 0 && value !== null
      )
    );

    this.productsService.getAllProduct(querys);
  }

  checkId(id: string) {
    console.log(id);
  }
}
