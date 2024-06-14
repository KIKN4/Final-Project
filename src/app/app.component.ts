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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'iSpace';
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }

      this.activatedRoute.queryParams.subscribe(() => {
        window.scrollTo(0, 0);
      });
      this.activatedRoute.params.subscribe(() => {
        window.scrollTo(0, 0);
      });
      this.activatedRoute.data.subscribe(() => {
        window.scrollTo(0, 0);
      });
      this.activatedRoute.paramMap.subscribe(() => {
        window.scrollTo(0, 0);
      });
    });

    this.authService.init();
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.cartService.getCart();
      }
    });
  }
}
