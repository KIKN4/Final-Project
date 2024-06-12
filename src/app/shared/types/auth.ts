import { Gender } from './user';

export interface SingUpRequest {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  address: string;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: Gender;
}

export interface SignUpForm extends SingUpRequest {
  confirmPassword: string;
}
