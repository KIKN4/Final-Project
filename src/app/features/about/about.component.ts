import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, ContactUsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
