import { makeEnvironmentProviders, EnvironmentProviders } from '@angular/core';
import { AuthOptions } from './auth-options';
import { AuthService } from './auth.service';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export function provideAuth(options: AuthOptions): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: AuthOptions, useValue: options },
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ]);
}

export function provideAuthForChild(): EnvironmentProviders {
    return makeEnvironmentProviders([
      AuthService
    ]);
  }
