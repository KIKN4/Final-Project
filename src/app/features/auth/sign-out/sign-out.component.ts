import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/types/user';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sign-out',
  imports: [CommonModule],
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css'],
})
export class SignOutComponent {
  @Input() user: User | null = null;
  private readonly authService = inject(AuthService);
  readonly user$ = this.authService.user$;

  signOut() {
    this.authService.signOut();
  }
}
