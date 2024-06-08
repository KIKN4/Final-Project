import { InjectionToken } from '@angular/core';

export interface Environment {
  apiURL: string;
}

export const ENVIRONMENT_DEFAULT = {
  apiURL: 'https://api.everrest.educata.dev',
};

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT', {
  providedIn: 'root',
  factory: () => ENVIRONMENT_DEFAULT,
});
