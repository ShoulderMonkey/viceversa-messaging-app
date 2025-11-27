import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AuthOptions } from './auth-options';
import { AuthService } from './auth.service';
import { JwtInterceptorService } from './jwt-interceptor.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  exports: []
})
export class ClientAuthModule {
  static forRoot(options: AuthOptions): ModuleWithProviders<ClientAuthModule> {
    return {
      ngModule: ClientAuthModule,
      providers: [
        { provide: AuthOptions, useValue: options },
        AuthService,
        JwtInterceptorService,
      ]
    };
  }

  static forChild(): ModuleWithProviders<ClientAuthModule> {
    return {
      ngModule: ClientAuthModule,
      providers: [
        AuthService]
    };
  }
}
