import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';

@Component({
  selector: 'app-confidentially',
  standalone: true,
  imports: [RouterLink, ContactUsComponent],
  templateUrl: './confidentially.component.html',
  styleUrl: './confidentially.component.css',
})
export class ConfidentiallyComponent {}
