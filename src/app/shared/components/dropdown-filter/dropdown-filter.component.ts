import { Component, Input } from '@angular/core';

// კარგი კომპონენტია! უბრალოდ მსგავს რამეს აკეთებს HTML-ში <details> ელემენტი.
// accessibility-სთვის ყოველთვის ჯობია ნეითივ ელემენტების გამოყენება.
@Component({
  selector: 'app-dropdown-filter',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-filter.component.html',
  styleUrl: './dropdown-filter.component.css',
})
export class DropdownFilterComponent {
  @Input() title!: string;
  isRotated = false;
  isDropdownVisible = false;

  get arrowClass() {
    return this.isRotated
      ? 'fa-solid fa-chevron-down rotate'
      : 'fa-solid fa-chevron-down';
  }

  toggleRotation() {
    this.isRotated = !this.isRotated;
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}
