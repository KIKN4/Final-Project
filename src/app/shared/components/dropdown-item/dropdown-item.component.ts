import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-item',
  standalone: true,
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.css'],
})
export class DropdownItemComponent {
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
