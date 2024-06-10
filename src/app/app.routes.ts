import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

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
  {
    path: 'delivery',
    loadComponent: () =>
      import('./features/delivery/delivery.component').then(
        (m) => m.DeliveryComponent
      ),
  },

  {
    path: 'about-us',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'confidentially',
    loadComponent: () =>
      import('./features/confidentially/confidentially.component').then(
        (m) => m.ConfidentiallyComponent
      ),
  },
  {
    path: 'wallet',
    loadComponent: () =>
      import('./features/wallet/wallet.component').then(
        (m) => m.WalletComponent
      ),
  },
  {
    path: 'category/:id',
    loadComponent: () =>
      import('./features/product-category/product-category.component').then(
        (m) => m.ProductsByCategoryComponent
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'delivery', pathMatch: 'full' },
];
