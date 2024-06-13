import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { canActivateAuthenticated } from './shared/guards/can-activate.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },

  {
    path: 'signin',
    loadComponent: () =>
      import('./features/auth/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      ),
  },
  {
    path: 'signout',
    loadComponent: () =>
      import('./features/auth/sign-out/sign-out.component').then(
        (m) => m.SignOutComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: 'cart',
    canActivate: [canActivateAuthenticated],
    loadComponent: () =>
      import('./features/cart/cart.component').then((m) => m.CartComponent),
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
    path: 'services',
    loadComponent: () =>
      import('./features/service-center/service-center.component').then(
        (m) => m.ServiceCenterComponent
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
  {
    path: 'search',
    loadComponent: () =>
      import('./features/product-category/product-category.component').then(
        (m) => m.ProductsByCategoryComponent
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
