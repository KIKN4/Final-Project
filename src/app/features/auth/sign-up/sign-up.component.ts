import { AsyncPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Gender } from '../../../shared/types/user';
import { AuthService } from '../../../shared/services/auth.service';
import { map } from 'rxjs';
import { AuthErrors } from '../../../shared/types/auth';
import { SignOutComponent } from '../sign-out/sign-out.component';

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
    SignOutComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly maxNameLength = 16;
  private readonly authService = inject(AuthService);
  readonly user$ = this.authService.user$;
  readonly genderOptions = [Gender.Female, Gender.Male];
  readonly isLoading$ = this.authService.isloading$;

  errorMessage$ = this.authService.errors$.pipe(
    map((error: AuthErrors): string => error.signUp)
  );

  signupForm = this.fb.group({
    firstName: [
      '',
      [Validators.required, Validators.maxLength(this.maxNameLength)],
    ],
    lastName: ['', [Validators.required]],
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
    gender: [Gender.Female, [Validators.required]],
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

  confirmPassValidator(compareTo: FormControl<string | null>): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      return control.value !== compareTo.value
        ? { confirmPass: `Passwords do not match!` }
        : null;
    };
  }
}
