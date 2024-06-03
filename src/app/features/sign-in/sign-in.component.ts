import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

  addActive() {
    this.displaySI = 'display: none;';
    this.classList = 'container active';
    this.displaySU = true;
  }

  removeActive() {
    this.displaySI = 'display: block;';
    this.displaySU = false;
    this.classList = 'container';
  }
}
