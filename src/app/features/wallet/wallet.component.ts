import { Component } from '@angular/core';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [ContactUsComponent],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css',
})
export class WalletComponent {}
