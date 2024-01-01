import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './home/app.config';
import { HomeComponent } from './home/home.component';

bootstrapApplication(HomeComponent, appConfig)
  .catch((err) => console.error(err));
