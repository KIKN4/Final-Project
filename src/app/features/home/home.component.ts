import { Component, OnInit, inject } from '@angular/core';
import { WelcomeComponent } from '../../shared/components/welcome/welcome.component';
import { SliderComponent } from '../../shared/components/slider/slider.component';
import { ProductCategoryComponent } from '../../shared/components/product-category/product-category.component';
import { FormsModule } from '@angular/forms';
import { ApiProduct } from '../../shared/types/apiProduct';
import { PhoneComponent } from '../../shared/components/phone/phone.component';
import { ServicesComponent } from '../../shared/components/offer/services.component';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    WelcomeComponent,
    SliderComponent,
    ProductCategoryComponent,
    PhoneComponent,
    ServicesComponent,
    ContactUsComponent,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  productsByCategory$ = this.productsService.categories$;
  phonesCategory: ApiProduct[] = [];

  ngOnInit(): void {
    this.productsService.getCategorys();
  }
}
