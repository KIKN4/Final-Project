import { Component, OnInit, inject } from '@angular/core';
import { WelcomeComponent } from '../../shared/components/welcome/welcome.component';
import { SliderComponent } from '../../shared/components/slider/slider.component';
import { CategoryService } from '../../shared/services/productCategory.service';
import { ProductCategoryComponent } from '../../shared/components/product-category/product-category.component';
import { FormsModule } from '@angular/forms';
import { ApiProduct } from '../../shared/types/apiProduct';
import { PhoneComponent } from '../../shared/components/phone/phone.component';
import { ServicesComponent } from '../../shared/components/offer/services.component';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TypeofCategory } from '../../shared/types/categoryType';

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
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  productsByCategory: TypeofCategory[] = [];
  phonesCategory: ApiProduct[] = [];

  constructor(private productsService: CategoryService) {}

  ngOnInit() {
    this.productsService.getCategorys().subscribe((response) => {
      this.productsByCategory = response;
    });
  }
}
