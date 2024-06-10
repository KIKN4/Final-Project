import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    let currentRoutePath = this.getRoutePath();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const newRoutePath = this.getRoutePath();
        if (currentRoutePath !== newRoutePath) {
          window.scrollTo(0, 0);
          currentRoutePath = newRoutePath;
        }
      }
    });
  }

  private getRoutePath(): string {
    return this.router.url.split('?')[0].split('#')[0];
  }
}
