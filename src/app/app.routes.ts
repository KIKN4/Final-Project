import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./features/service-center/service-center.component').then(
        (m) => m.ServiceCenterComponent
      ),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./features/auth/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
