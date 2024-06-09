import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [RouterLink, ContactUsComponent],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css',
})
export class DeliveryComponent {}
