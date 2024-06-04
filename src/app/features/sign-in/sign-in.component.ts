import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  displaySI = 'display: block;';
  displaySU = false;
  signIn = '';
  container = 'container';
  register = 'register';
  loginBtn = 'login';
  classList = 'container';

  private router = inject(Router);

  addActive() {
    this.router.navigate(['signin'], {
      queryParams: { register: 'signUp' },
    });

    this.displaySI = 'display: none;';
    this.classList = 'container active';
    this.displaySU = true;
  }

  removeActive() {
    this.router.navigate(['signin'], {
      queryParams: {},
    });

    this.displaySI = 'display: block;';
    this.displaySU = false;
    this.classList = 'container';
  }
}
