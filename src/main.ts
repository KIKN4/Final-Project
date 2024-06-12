import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { register as registerSwiperelements } from 'swiper/element/bundle';

registerSwiperelements();
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
