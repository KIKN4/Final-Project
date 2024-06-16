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

  hamburger = 'hamburger';
  display = '';
  top = '';
  overflow = '';

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  burgerBar() {
    this.hamburger === 'hamburger'
      ? (this.hamburger = 'hamburger-active')
      : (this.hamburger = 'hamburger');
    this.display === '' ? (this.display = 'block') : (this.display = 'none');
    this.top !== '0%' ? (this.top = '0%') : (this.top = '-100%');
    // this.display = 'block';
    // this.right = '0%';
    // this.overflow = 'hidden';
  }
  closeBar() {
    this.hamburger = 'hamburger';
    this.display = 'none';
    this.top = '-100%';
  }
}
