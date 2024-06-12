import { AsyncPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Gender } from '../../../shared/types/user';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    TitleCasePipe,
    AsyncPipe,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  displaySI = 'display: block;';
  displaySU = false;
  signIn = '';
  container = 'container';
  register = 'register';
  loginBtn = 'login';
  classList = 'container';

  private router = inject(Router);
  private readonly authService = inject(AuthService);
  readonly genderOptions = [Gender.Female, Gender.Male, Gender.Other];
  readonly isLoading$ = this.authService.isloading$;

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
  private readonly fb = inject(NonNullableFormBuilder);

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
    age: [18, [Validators.required]],
    address: ['tbilisi', [Validators.required]],
    phone: ['', [Validators.required]],
    zipcode: ['tbilisi', [Validators.required]],
    avatar: [
      'https://api.dicebear.com/8.x/lorelei/svg?seed=Felix',
      [Validators.required],
    ],
    gender: [Gender.Other, [Validators.required]],
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
    const sigUpData = this.signupForm.getRawValue();
    this.authService.signUp(sigUpData);
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
