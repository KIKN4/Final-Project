import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgOptimizedImage, FormsModule, AsyncPipe],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {
  private readonly productsService = inject(ProductsService);
  products$ = this.productsService.products$;
}
