import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    ...(appConfig.providers || []),
    // { provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true }
  ]
})
  .catch((err) => console.error(err));
