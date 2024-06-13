import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  user$ = this.authService.user$;

  display = '';
  right = '';
  overflow = '';

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  burgerBar() {
    this.display = 'block';
    this.right = '0%';
    this.overflow = 'hidden';
  }
  closeBar() {
    this.display = 'none';
    this.right = '-100%';
  }
}
