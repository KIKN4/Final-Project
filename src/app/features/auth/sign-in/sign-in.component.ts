import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { map } from 'rxjs';
import { AuthErrors } from '../../../shared/types/auth';
import { SignOutComponent } from '../sign-out/sign-out.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    AsyncPipe,
    SignOutComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly authService = inject(AuthService);
  readonly user$ = this.authService.user$;

  errorMessage$ = this.authService.errors$.pipe(
    map((error: AuthErrors): string => error.signIn)
  );
  isLoading$ = this.authService.isloading$;
  isSignUpSucces = false;
  email = '';
  password = '';

  onSignIn() {
    this.authService.signIn(this.email, this.password);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queryParamMap) => {
      this.isSignUpSucces = Boolean(queryParamMap.get('signUpSucces'));
    });
  }
}
