import { Injectable, Injector, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, from } from 'rxjs';
import { mergeMap, first, catchError, map } from 'rxjs/operators';

/**
 * Used to override default Angular canActivate behaviour
 * Combines all guards passed as params to allow activation in OR.
 * 
 * Example if i pass two guards, if just one of the guards returns true then the route is activated
 * @param guards pass guards to combine
 * @returns 
 */
export function combinedGuards(guards: Type<CanActivate>[]): Type<CanActivate> {
  @Injectable({ providedIn: 'root' })
  class DynamicGuard implements CanActivate {
    constructor(private injector: Injector, private router: Router,private toastr: ToastrService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      const guardInstances = guards.map(guard => this.injector.get(guard));

      return from(guardInstances)
        .pipe(
          mergeMap((guard: CanActivate) => {
            const result = guard.canActivate(route, state);
            return result instanceof Promise ? from(result) : (result instanceof Observable ? result : from([result]));
          }),
          first(Boolean, false),
          catchError((error, caught) => {
            console.error('Error in guards processing', error);
            this.router.navigate(['/error']);
            return from([false]);
          }),
          map(result => {
            if (!result) {
              this.toastr.error('Permission denied');
            }
            
            return result;
          })
        );
    }
  }

  return DynamicGuard;
}
