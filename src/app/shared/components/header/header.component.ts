import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  display = '';
  right = '';
  overflow = '';
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
