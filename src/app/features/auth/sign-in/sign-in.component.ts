import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
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

  // FormControl

  // sign in

  email = '';
  password = '';

  onSignIn(email: string, password: string) {
    console.log(email, password);
  }

  // end of sign in

  // sign up
  private readonly maxNameLength = 16;
  private readonly fb = inject(FormBuilder);

  signupForm = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.maxLength(this.maxNameLength),
        this.badNameValidator('bidzina'),
      ],
    ],
    lastName: [
      '',
      [Validators.required, Validators.maxLength(this.maxNameLength)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  get controls() {
    return this.signupForm.controls;
  }

  ngOnInit(): void {
    this.controls.confirmPassword.setValidators(
      this.confirmPassValidator(this.controls.password)
    );
    this.controls.password.valueChanges.subscribe(() => {
      this.controls.confirmPassword.updateValueAndValidity();
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  badNameValidator(pattern: string): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      return control.value.includes(pattern)
        ? { badName: `${pattern} is prohibited!` }
        : null;
    };
  }

  confirmPassValidator(compareTo: FormControl<string | null>): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      return control.value !== compareTo.value
        ? { confirmPass: `Passwords do not match!` }
        : null;
    };
  }

  // end of sign up
}
