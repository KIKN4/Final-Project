import { Component, Input } from '@angular/core';
import { ApiProduct } from '../../types/apiProduct';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css',
})
export class PhoneComponent {
  @Input({ required: true }) phone!: ApiProduct;
}
