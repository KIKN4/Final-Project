import { HttpStatusCode } from '@angular/common/http';

export interface ApiError {
  error: string;
  errorKeys: string[];
  statusCode: HttpStatusCode;
  timestamp: string;
  path: string;
  help: string;
  documentation: string;
  swagger: string;
}
