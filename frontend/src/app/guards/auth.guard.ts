import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";

import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log('auth guard')
    const expectedRole = route.data['role'];
    return this.authService.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          this.router.navigateByUrl('/admin');
          return false;
        } else {
          let role = user['role'];
          if (role === expectedRole) {
            return true;
          } else if( role === "ADMIN") {
            this.router.navigateByUrl('/plans');
            return false;
          }else{
            return false;
          }
        }
      })
    )
  }
}
