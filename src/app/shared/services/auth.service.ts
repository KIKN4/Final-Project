import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SingUpRequest } from '../types/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly env = inject(ENVIRONMENT);
  private readonly baseUrl = `${this.env.apiURL}/auth`;
  private readonly router = inject(Router);
  private readonly httpClient = inject(HttpClient);

  isloading$ = new BehaviorSubject<boolean>(false);

  signUp(data: SingUpRequest) {
    this.isloading$.next(true);
    this.httpClient.post(`${this.baseUrl}/sign_up`, data).subscribe(() => {
      this.isloading$.next(false);
      this.router.navigate(['signin'], {
        queryParams: { signUpSucces: true },
      });
    });
  }
}
