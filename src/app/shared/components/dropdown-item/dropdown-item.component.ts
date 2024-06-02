import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-item',
  standalone: true,
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.css'],
})
export class DropdownItemComponent {
  @Input() title!: string;
  displayUl = 'none';
  displayWrap = 'none';

  toggleDisplay() {
    this.displayUl = this.displayUl === 'none' ? 'block' : 'none';
    this.displayWrap = this.displayWrap === 'none' ? 'block' : 'none';
  }
}
