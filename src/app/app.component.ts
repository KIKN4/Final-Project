import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthService } from './shared/services/auth.service';
import { CartService } from './shared/services/cart.service';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'iSpace';
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  constructor() {
    // eew what is this..?
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     window.scrollTo(0, 0);
    //   }

    //   this.activatedRoute.queryParams.subscribe(() => {
    //     window.scrollTo(0, 0);
    //   });
    //   this.activatedRoute.params.subscribe(() => {
    //     window.scrollTo(0, 0);
    //   });
    //   this.activatedRoute.data.subscribe(() => {
    //     window.scrollTo(0, 0);
    //   });
    //   this.activatedRoute.paramMap.subscribe(() => {
    //     window.scrollTo(0, 0);
    //   });
    // });

    // გააერთიანე სტრიმები
    // ზოგადად არაა ეს სქროლის პოზიციის შეცვლა კარგი აზრი.
    merge([
      this.router.events,
      this.activatedRoute.queryParams,
      this.activatedRoute.params,
      this.activatedRoute.data,
    ])
      .pipe(takeUntilDestroyed()) // კონსტრუქტორში თუ წერ ამას, DestroyRef არ სჭირდება თავისით იპოვის.
      .subscribe();

    this.authService.init();
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.cartService.getCart();
      }
    });
  }
}
